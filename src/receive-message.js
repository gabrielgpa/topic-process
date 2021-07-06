require('dotenv').config()
let AWS = require('aws-sdk')

AWS.config.update({ region: process.env.AWS_REGION })

let sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
let queueURL = process.env.QUEUE_URL
let params = {
    AttributeNames: [],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
}

sqs.receiveMessage(params, (errRec, dataRec) => {
    if (errRec) {
        console.log("Receive Error", err)
        return
    }
    
    if (dataRec.Messages && dataRec.Messages.length) {
        let [ messageItem ] = dataRec.Messages
        let { Body } = messageItem
        let { Message } = JSON.parse(Body)
        let messageObject = Message ? JSON.parse(bodyObject.Message) : JSON.parse(Body)

        console.log(messageObject) // do something

        let deleteParams = {
            QueueUrl: queueURL,
            ReceiptHandle: messageItem.ReceiptHandle
        }

        sqs.deleteMessage(deleteParams, (errDel, dataDel) => {
            if (errDel) {
                console.log("Delete Error", errDel)
            } else {
                console.log("Message Deleted", dataDel)
            }
        })
    }
})
