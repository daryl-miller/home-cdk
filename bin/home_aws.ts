#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import {BillingAlarmStack} from '../lib/billing_alarm_stack'
import {AlarmTopicStack} from '../lib/alarm_topic_stack'
import {props} from '../env'

const app = new cdk.App()

new AlarmTopicStack(app, 'AlarmTopic-Stack', props)
new BillingAlarmStack(app, 'BillingAlarmStack', props)
