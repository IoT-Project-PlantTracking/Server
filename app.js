const mqtt = require('mqtt')

const mqttHandler = require("./mqttHandler")

const db = require("./dbHandler")

mqttHandler.mqttSubscribe("/00/IoTPlant/GDAToServer")

mqttHandler.mqttListener()

mqttMessageIn = JSON.parse(JSON.stringify(mqttHandler.messageIn))

//Things needed to be recived in the MQTT from the GDA:
// id (The CDA/ Plant id),
// message (The command, that explains which 'if statement' the server needs to activate),
// addWater (The amount of water calculated to be added) &
// moistureLevel (The measured moisture level)


plantID = mqttMessageIn[0].id

if (mqttMessageIn[0].message == 'moistLevel') {
    // function for posting moisturelevel to db
    date = new Date()
    addedWater = mqttMessageIn[0].addWater
    moistLevel = mqttMessageIn[0].moistureLevel
    db.dbCon('Insert Into watering_record (added_water, plant_id, datetime, moisture) Values (' + addedWater + ', ' + plantID + ', ' + date + ', ' + moistLevel + ');')
    db.dbCon('Update Plant Set latest_m_level = ' + moistLevel + 'Where id = ' + plantID + ';')
    db.dbCon('Update Plant_information Set added_water_amount = ' + addedWater + 'Where id = ' + plantID +';')
}

else if (mqttMessageIn[0].message == 'pumpFault') {
    // function for posting pumpFault to db
    db.dbCon('Update Plant_information Set pump_fault = 1;')
}
else {
    console.log("unknow mqtt request")
}








