import * as cdk from '@aws-cdk/core'
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions'
import * as sns from '@aws-cdk/aws-sns'
import * as ssm from '@aws-cdk/aws-ssm'
import {CfnOutput} from '@aws-cdk/core'

export class AlarmTopicStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const alertTopic = new sns.Topic(this, 'AlertTopic')

    const emailAddress = ssm.StringParameter.valueForStringParameter(this, '/home/contact/alarmemail')
    const mobileNumber = ssm.StringParameter.valueForStringParameter(this, '/home/contact/mobile')

    alertTopic.addSubscription(new subscriptions.EmailSubscription(emailAddress))
    alertTopic.addSubscription(new subscriptions.SmsSubscription(mobileNumber))

    new CfnOutput(this, 'AlertTopicArn', {
      value: alertTopic.topicArn,
      exportName: 'AlertTopicArn'
    })

    new CfnOutput(this, 'AlertTopicName', {
      value: alertTopic.topicName,
      exportName: 'AlertTopicName'
    })
  }
}
