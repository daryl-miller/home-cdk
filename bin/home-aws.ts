#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HomeAwsStack } from '../lib/home-aws-stack';

const app = new cdk.App();
new HomeAwsStack(app, 'HomeAwsStack');
