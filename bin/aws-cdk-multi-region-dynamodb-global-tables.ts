#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkMultiRegionDynamodbGlobalTablesStack } from '../lib/aws-cdk-multi-region-dynamodb-global-tables-stack';

const app = new cdk.App();
new AwsCdkMultiRegionDynamodbGlobalTablesStack(app, 'AwsCdkMultiRegionDynamodbGlobalTablesStack');
