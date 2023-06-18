const mqtt = require('mqtt')

const mqttHandler = require("./mqttHandler")

const db = require("./dbHandler")

const mqttSplit = '%'

const sql = require("mysql");

//Credentials
const mysqlConnection = sql.createConnection({
  host       : 'sql7.freesqldatabase.com',
  user       : 'sql7617080',
  password   : 'viasK1CvkH',
  database   : 'sql7617080'
});

mqttHandler.mqttSubscribe("/00/IoTPlant/GDAToServer")


function dataHandler(mqttMessageIn) {
    if (mqttMessageIn !== undefined) {
        data = mqttMessageIn.split(mqttSplit)
        console.log(data)
        console.log(data[0])
        console.log(data[1])
        console.log(data[2])
        console.log(data[3])
    
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
            moistureLevel = data[2]
            dateTime = data[3]
            pumpFault = data[4]
            console.log('Message = ' + data[0] + ' plantID = ' + plantID + ' moistLevel = ' + moistureLevel)

            mysqlConnection.query('INSERT INTO wateringRecord (plantid, dateTime, moisture) VALUES (?, ?, ?)', [plantID, dateTime, moistureLevel], function(error) {
                if(error) {
                    throw error
                }
            })
            mysqlConnection.query('UPDATE plant SET latestMoisture = '+ moistureLevel + ' WHERE id = '+ plantID +'', function(error) {
                if(error) {
                    throw error
                }
            })
            mysqlConnection.query('UPDATE plant SET pumpFault = '+ pumpFault + ' WHERE id = '+ plantID +'', function(error) {
                if(error) {
                    throw error
                }
            })
        }
        else {
            console.log("Not correct format")
        }
    }     
}

mqttHandler.mqttListener(dataHandler)








