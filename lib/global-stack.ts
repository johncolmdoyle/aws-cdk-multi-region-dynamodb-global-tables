import * as cdk from '@aws-cdk/core';
import * as  dynamodb  from  '@aws-cdk/aws-dynamodb';

interface  CustomGlobalStackProps  extends  cdk.StackProps  {
  readonly  globalTableName: string;
  readonly  globalTablePrimaryKeyName: string;
  readonly  replicationRegions: string[];
  readonly  env: any;
}

export class GlobalStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CustomGlobalStackProps) {
    super(scope, id, props);

    const globalTable = new dynamodb.Table(this, 'globalTable', {
      tableName: props.globalTableName,
      partitionKey: {
        name: props.globalTablePrimaryKeyName,
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      replicationRegions: props.replicationRegions,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    globalTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    }).scaleOnUtilization({ targetUtilizationPercent: 75 });
  }
}
