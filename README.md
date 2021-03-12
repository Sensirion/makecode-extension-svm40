# Sensirion SVM40 Makecode Extension

Makecode extension for the Sensirion SVM40 evaluation kit connected to the micro:bit platform.

This extension allows you to read VOC (Volatile Organic Components), temperature and relative humidity values with an interval of 1 second.


## SVM40 Evaluation Kit

[<center><img src="SVM4x.png" width="500px"></center>](https://www.sensirion.com/my-sgp-ek/)

* Additional information:
[SVM40 Product Homepage](https://www.sensirion.com/en/environmental-sensors/evaluation-kit-sek-environmental-sensing/evaluation-kit-sek-svm40/)
* Where to Buy: [Buy SVM40 Evaluation Kit](https://www.sensirion.com/index.php?id=1161&L=5&url=%22https://dilp.netcomponents.com/cgi-bin/sensirion.asp?lang=de&Region=NA&mode=2&partnumber1=SVM40&pq=Suchen%22)


## Supported Targets

* PXT/microbit
* Calliope mini

## I2C Address

* 0x6A

## Usage

open your microbit makecode project, in "+ Extension", paste the following URL:

https://github.com/Sensirion/makecode-extension-svm40

### Connecting the Sensor

If you don't have a suitable cable at hand, please find the SEK-SVM40 pinout listed below, or in
the [technical documentation](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/9_Gas_Sensors/Sensirion_Gas_Sensors_SEK-SVM40_Technical_Description_D1.pdf):

| *Pin* | *Cable Color* | *Name* | *Description* | *Comments* |
|-------|---------------|--------|---------------|------------|
| 1     | Red           | VDD    | Supply Voltage | 3.3 or 5.0 V
| 2     | Black         | Ground |
| 3     | Green         | SDA    | I2C: Serial data, bidirectional |
| 4     | Yellow        | SCL    | I2C: Serial clock |
| 5     | Blue          | SEL    | Interface select | Pull to GND to select I2C
|       |               |        |  | Leave floating or pull to VDD to select UART
| 6     | Purple        | NC     | Do not connect |


## Demo

![](demo.png)


## API

Get VOC value in ppb (parts per billion)
```ts
function get_voc()
```

Get temperature in degree celsius. Takes an optional argument to change to fahrenheit.
```ts
function get_temperature()
```

Get relative humidity in percent
```ts
function get_relative_humidity()
```

Start measurement on SVM40 evaluation kit. This method will be automatically called on initialization.
If you call `stop_continuous_measurement()` you have to call this method again before voc, temperature and humidity
values can be retrieved again.
```ts
function start_continuous_measurement()
```

Stop measurement on SVM40 evaluation kit. After calling this function, no more sensor values can be read out
anymore until you call `start_continuous_measurement`
```ts
function stop_continuous_measurement()
```


## License

[MIT](LICENSE)

Copyright (c) 2021, Sensirion AG

