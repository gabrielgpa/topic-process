require('dotenv').config()
let AWS = require('aws-sdk')

AWS.config.update({ region: process.env.AWS_REGION })

let sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
let message = JSON.stringify({
    id: '1234567890',
    name: 'Charlie Chaplin',
    email: 'example@email.com'
})
let params = {
    DelaySeconds: 10,
    MessageAttributes: {},
    MessageBody: message,
    QueueUrl: process.env.QUEUE_URL
}

sqs.sendMessage(params, (err, data) => {
    if (err) {
        console.log("Error", err)
    } else {
        console.log("Success", data.MessageId)
    }
})
