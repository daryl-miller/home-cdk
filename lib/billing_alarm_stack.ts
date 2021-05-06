import * as cdk from '@aws-cdk/core'
import * as cloudwatch from '@aws-cdk/aws-cloudwatch'
import * as cloudwatchactions from '@aws-cdk/aws-cloudwatch-actions'
import * as sns from '@aws-cdk/aws-sns'
import {Duration, Fn} from '@aws-cdk/core'

export class BillingAlarmStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const topicArn = Fn.importValue('AlertTopicArn')

    const topic = sns.Topic.fromTopicArn(this, 'AlarmTopic', topicArn)

    const metric = new cloudwatch.Metric({
      namespace: 'AWS/Billing',
      metricName: 'EstimatedCharges',
      statistic: 'Maximum',
      period: Duration.hours(6),
      region: 'ap-southeast-2'
    })

    const alarm = new cloudwatch.Alarm(this, 'BillingAlarm', {
      evaluationPeriods: 1,
      actionsEnabled: true,
      alarmName: 'HomeBillingAlarm',
      alarmDescription: 'You have exceeded expect costs',
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      period: Duration.hours(6),
      threshold: 25,
      statistic: 'max',
      metric
    })

    alarm.addAlarmAction(new cloudwatchactions.SnsAction(topic))
  }
}
