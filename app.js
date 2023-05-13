const mqtt = require('mqtt')

const mqttHandler = require("./mqtt_Handler")

mqttHandler.mqttSubscribe("/test")

mqttHandler.mqttListener()



