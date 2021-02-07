import * as cdk from '@aws-cdk/core';
import * as  dynamodb  from  '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

interface  CustomAppStackProps  extends  cdk.StackProps  {
  readonly  globalTablePrimaryKeyName: string;
  readonly  globalTableName: string;
  readonly  env: any;
}

export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CustomAppStackProps) {
    super(scope, id, props);

    const client = new DynamoDB({  region: props.env.region  });

    // Query the regions table
    let globalTableInfoRequest = async() => await client.describeTable({ TableName: props.globalTableName });
    
    globalTableInfoRequest().then(  globalTableInfoResult  =>  {
      // Mock the table with the specific ARN and Stream ARN
      const globalTable = dynamodb.Table.fromTableAttributes(this, "globalTable", {
        tableArn: globalTableInfoResult?.Table?.TableArn,
        tableStreamArn: globalTableInfoResult?.Table?.LatestStreamArn
      });
      
      // Lambda
      const triggerLambda = new lambda.Function(this, 'triggerLambda', {
        code: new lambda.AssetCode('src'),
        handler: 'get.handler',
        runtime: lambda.Runtime.NODEJS_10_X,
        environment: {
          TABLE_NAME: props.globalTableName,
          PRIMARY_KEY: props.globalTablePrimaryKeyName
        }
      });

      // Grant read access
      globalTable.grantStreamRead(triggerLambda);
    });
  }
}
