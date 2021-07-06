require('dotenv').config()
let AWS = require('aws-sdk')

AWS.config.update({ region: process.env.AWS_REGION })

let params = {
    Message: JSON.stringify({ 
        id: '1234567890',
        name: 'Charlie Chaplin', 
        email: 'example@email.com' 
    }),
    TopicArn: process.env.TOPIC_ARN
}

let publishTextPromise = new AWS
    .SNS({ apiVersion: '2010-03-31' })
    .publish(params)
    .promise()

publishTextPromise.then(data => {
    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`)
    console.log("MessageID is " + data.MessageId)
}).catch(err => {
    console.error(err, err.stack)
})
