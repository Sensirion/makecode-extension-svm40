namespace SVM40 {

    export enum SVM40_T_UNIT {
        //% block="C"
        C = 0,
        //% block="F"
        F = 1
    }

    const SVM40_I2C_ADDR = 0x6A;

    let voc = 0;
    let temperature = 0;
    let relative_humidity = 0;

    init();

    function read_word(repeat = false) {
        let value = pins.i2cReadNumber(SVM40_I2C_ADDR, NumberFormat.UInt16BE, repeat);
        pins.i2cReadNumber(SVM40_I2C_ADDR, NumberFormat.UInt8BE, repeat);
        return value
    }

    function read_words(number_of_words: number) {
        let buffer = pins.i2cReadBuffer(SVM40_I2C_ADDR, number_of_words * 3, false);
        let words:number[] = [];
        for (let i = 0; i < number_of_words; i++) {
            words.push(buffer.getNumber(NumberFormat.UInt16BE, 3*i));
        }
        return words;
    }


    function get_signals() {
        pins.i2cWriteNumber(SVM40_I2C_ADDR, 0x03A6, NumberFormat.UInt16BE);
        basic.pause(1);
        let values = read_words(6);
        let adc_voc = values[0];
        let adc_rh = values[1];
        let adc_t = values[2];
        voc = adc_voc / 10;
        relative_humidity = adc_rh / 100;
        temperature =  adc_t / 200;
    }

    /**
     * init
     */
    //% blockId="SVM40_INIT" block="init"
    //% weight=80 blockGap=8
    export function init() {
        start_continuous_measurement();
    }

    /**
     * This command triggers the operation mode of all sensors. It
     * must be called once prior to the get_signals or
     * get_raw_signals commands, respectively.
     */
    //% blockId="SVM40_START_CONTINUOUS_MEASUREMENT" block="start continuous measurement"
    //% weight=80 blockGap=8
    export function start_continuous_measurement() {
        pins.i2cWriteNumber(SVM40_I2C_ADDR, 0x0010, NumberFormat.UInt16BE);
    }

    /**
     * stop continuous measurement. Call this to stop SVM40 internal measurements
     */
    //% blockId="SVM40_STOP_CONTINUOUS_MEASUREMENT" block="stop continuous measurement"
    //% weight=80 blockGap=8
    export function stop_continuous_measurement() {
        pins.i2cWriteNumber(SVM40_I2C_ADDR, 0x03A6, NumberFormat.UInt16BE);
        basic.pause(50);
    }

    /**
     * get VOC. Call this at most once per second, 
     * else last measurement value will be returned
     */
    //% blockId="SVM40_GET_VOC" block="voc %u"
    //% weight=80 blockGap=8
    export function get_voc() {
        get_signals();
        return voc;
    }

    /**
     * get temperature. Call this at most once per second, 
     * else last measurement value will be returned
     */
    //% blockId="SVM40_GET_TEMPERATURE" block="temperature %u"
    //% weight=80 blockGap=8
    export function get_temperature(unit: SVM40_T_UNIT = SVM40_T_UNIT.C) {
        get_signals();
        if (unit == SVM40_T_UNIT.C) {
            return temperature;
        }
        return 32 + ((temperature * 9) / 5);
    }

    /**
     * get relative humidity. Call this at most once per second, 
     * else last measurement value will be returned
     */
    //% blockId="SVM40_GET_RELATIVE_HUMIDITY" block="relative humidity %u"
    //% weight=80 blockGap=8
    export function get_relative_humidity() {
        get_signals();
        return relative_humidity;
    }

    /**
     * This command performs a reset of the device and restarts the
     * SVM40 in idle mode. Prior to executing the reset, the device
     * will acknowledge the call. All previously set parameters sent by
     * svm40_set_temperature_offset, svm40_set_voc_parameters,
     * and svm40_set_states commands will be lost. The
     * temperature offset and the VOC Algorithm parameters can be
     * stored to the non-volatile memory of SVM40 by calling the
     * svm40_store_input_parameters command.
     */
    //% blockId="SVM40_DEVICE_RESET" block="device reset"
    //% weight=80 blockGap=8
    export function device_reset() {
        pins.i2cWriteNumber(SVM40_I2C_ADDR, 0xD304, NumberFormat.UInt16BE);
    }
}
