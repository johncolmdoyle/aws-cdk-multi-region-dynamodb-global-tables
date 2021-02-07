#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GlobalStack } from '../lib/global-stack';
import { AppStack } from '../lib/app-stack';

// Table configuration
const globalTableName = 'multi-region-exmaple';
const primaryKeyName = 'id';

// Region configurations
const primaryTableRegion = 'us-west-2';
const tableReplicatedRegions = ['us-east-2'];
const appRegions = ['us-east-2', 'us-west-2'];

const app = new cdk.App();

const globalstack = new GlobalStack(app, 'GlobalStack', {
    env: {region: primaryTableRegion},
    globalTableName: globalTableName,
    globalTablePrimaryKeyName: primaryKeyName,
    replicationRegions: tableReplicatedRegions
});

appRegions.forEach(function  (item,  index)  {
  new AppStack(app, 'AppStack-'.concat(item),  {
    env: {account: process.env.CDK_DEFAULT_ACCOUNT, region: item},
    globalTableName: globalTableName,
    globalTablePrimaryKeyName: primaryKeyName 
  });
});

cdk.Tags.of(app).add("app", "multi-region-part-1-example");
