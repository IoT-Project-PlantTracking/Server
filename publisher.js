const mqtt = require('mqtt')

const mqttHandler = require("./pub_Handler")

mqttHandler.mqttPublish("/test", "Hey U Ther?")