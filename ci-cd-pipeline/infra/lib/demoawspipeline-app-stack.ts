import { StackProps, Stage } from "aws-cdk-lib";
import { LambdaStack } from "./lambda-stack";
import { Construct } from "constructs";

export class PipelineAppStage extends Stage {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const lambdaStack = new LambdaStack(this, 'LambdaStack');
    }
}