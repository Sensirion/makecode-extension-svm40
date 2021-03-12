// tests go here; this will not be compiled when this package is used as an extension.
basic.forever(function () {
    serial.writeValue("VOC", SVM40.get_voc());
    serial.writeValue("T", SVM40.get_temperature(SVM40.SVM40_T_UNIT.C));
    serial.writeValue("RH", SVM40.get_relative_humidity());
    basic.pause(1000);
})

