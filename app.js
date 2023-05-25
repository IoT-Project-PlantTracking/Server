const mqtt = require('mqtt')

const mqttHandler = require("./mqttHandler")

const db = require("./dbHandler")

const mqttSplit = '%'

mqttHandler.mqttSubscribe("/00/IoTPlant/GDAToServer")

mqttHandler.mqttListener()

mqttMessageIn = mqttHandler.messageIn

data = mqttMessageIn.split(mqttSplit)

// Things recived from the GDA is required to be in the following order:
// message + '%' + id + '%' + moistureLevel + '%' + addWater

// The different variables are descirbed further here:
//  1. message = The command that explains which 'if statement' the server needs to activate
//  2. id = The CDA or Plant id
//  3. moistureLevel = The measured moisture level
//  4. addWater = The amount of water calculated to be added


if (data[0] == 'moistLevel') {
    // function for posting moisturelevel to db
    plantID = data[1]
    date = new Date()
    moistLevel = data[2]
    addedWater = data[3]
    db.dbCon('INSERT INTO watering_record (added_water, plant_id, datetime, moisture) VALUES (' + addedWater + ', ' + plantID + ', ' + date + ', ' + moistLevel + ');')
    db.dbCon('Update Plant Set latest_m_level = ' + moistLevel + 'Where id = ' + plantID + ';')
    db.dbCon('Update Plant_information Set added_water_amount = ' + addedWater + 'Where id = ' + plantID +';')
}

else if (data[0] == 'pumpFault') {
    // function for posting pumpFault to db
    plantID = data[1]
    db.dbCon('UPDATE Plant_information WHERE id = ' + plantID + ' SET pump_fault = 1;')
}
else {
    console.log("unknow mqtt request")
}








