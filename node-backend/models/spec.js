const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specSchema = new Schema({
    general:
    {
        brand: String,
        model: String,
        priceInIndia: String,
        releaseDate: String,
        formFactor: String,
        dimension: String,
        weight: Number,
        batteryCapacity: Number,
        fastCharging: String,
        wirelessCharging: String,
        colors: String
    }
    ,
    display: {
        screenSize: String,
        touchScreen: String,
        resolution: String
    },
    hardware: {
        processor: String,
        processorMake: String,
        ram: String,
        internalStorage: String,
        expandableStorage: String,
        expandableType: String,
        dedicatedMicroSDslot: String
    },
    camera: {
        rearCamera: String,
        noOfRearCam: Number,
        rearAutofocus: String,
        rearFlash: String,
        frontCamera: String,
        npOfFrontCamera: Number,
        popUpCamera: String,
    },
    software: {
        Op: String,
        skin: String,
    },
    connectivity: {
        wifi: String,
        gps: String,
        bT: String,
        usbType: String,
        microUSb: String,
        lighting: String,
        headphones: String,
        noOfSims: Number,
        Active4gOnBothSim: String,
        simType: String,
    },
    sensors: {
        fingerPrintSensor: String,
        proximitySensor: String,
        accelerometer: String,
        ambientLight: String,
        gyroscope: String
    }
});

module.exports = mongoose.model('Spec', specSchema);