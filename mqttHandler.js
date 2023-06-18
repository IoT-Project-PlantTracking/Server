const { Module } = require('module')
const mqtt = require('mqtt')


const host = 'test.mosquitto.org'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`


subscribed = false

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
            subscribed = false
        }
        else if (onComplete) {
            console.log('Connected')
            client.subscribe([subTopic], (error) => {
                if (error) {
                    console.error(error)
                    subscribed = false
                }
                else{
                    console.log(`Subscribe to topic '${subTopic}'`)
                    subscribed = true
                }
            })
        }
        else {
            console.log("Wtf?(subscribe)")
            subscribed = false
        }
    })
}

function mqttPublish(pubTopic, message) {
    client.on('connect', () => {
        console.log('Connected')
        client.publish(pubTopic, message, { qos: 1, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
            else {
                console.log("Published")
            }
        })
    })    
}

function mqttListener(callback) {
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
        let messageIn = JSON.parse(payload.toString())
        callback(messageIn)
      })
}

module.exports = {
mqttSubscribe,
mqttPublish,
mqttListener
}