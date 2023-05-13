const { Module } = require('module')
const mqtt = require('mqtt')

const host = 't1109cc7.ala.us-east-1.emqxsl.com'
const port = '8883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

function mqttSubscribe(subTopic) {
    console.log("mqttSubscribe called w/ topic: ", subTopic)
    client.on('connect', (onComplete, onError) => {
        if (onError) {
            console.error(onError)
        }
        else if (onComplete) {
            console.log('Connected')
            client.subscribe([subTopic], (error) => {
                if (error) {
                    console.error(error)
                }
                else{
                    console.log(`Subscribe to topic '${topic}'`)
                }
            })
        }
        else {
            console.log("Wtf?(subscribe)")
        }
    })
}

function mqttPublish(pubTopic, message) {
    client.on('connect', () => {
        console.log('Connected')
        client.publish(pubTopic, message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
            else {
                console.log("Published")
            }
        })
    })    
}

function mqttListener() {
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
      })
}

module.exports = {
mqttSubscribe,
mqttPublish,
mqttListener
}