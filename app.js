const mqtt = require('mqtt')

const mqttHandler = require("./mqtt_Handler")

const db = require("./dbHandler")

mqttMessageOut = "hi"

mqttHandler.mqttSubscribe("/00/IoTPlant/GDAToServer")


mqttHandler.mqttListener()

mqttMessageIn = mqttHandler.messageIn

if (mqttMessageIn == 'rangeRequest') {
    minLevel = db.dbCon('Select minLevel from Plants where ID = ', plantID, ';')
    maxLevel = db.dbCon('Select maxLevel from Plants where ID = ', plantID, ';')

    pubTopic = "/00/IoTPlant/ServerToGDA ", plantID
    range = plantID, minLevel, maxLevel

    mqttHandler.mqttPublish(pubTopic, range)

}

else if (mqttMessageIn == 'moistLevel') {
    // function for posting moisturelevel to db
}

else if (mqttMessageIn == 'pumpFault') {
    // function for posting pumpFault to db
}
mqttHandler.mqttPublish("/00/IoTPlant/ServerToGDA", mqttMessageOut)








