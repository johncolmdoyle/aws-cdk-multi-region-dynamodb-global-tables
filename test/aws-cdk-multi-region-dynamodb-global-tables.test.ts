import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AwsCdkMultiRegionDynamodbGlobalTables from '../lib/aws-cdk-multi-region-dynamodb-global-tables-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsCdkMultiRegionDynamodbGlobalTables.AwsCdkMultiRegionDynamodbGlobalTablesStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
