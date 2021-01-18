import {account} from './account'
import * as cdk from '@aws-cdk/core'

export const props: cdk.StackProps = {
  env: {
    account,
    region: 'ap-southeast-2'
  }
}
