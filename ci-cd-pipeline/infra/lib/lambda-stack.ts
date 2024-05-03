import { Stack, StackProps } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const lambda = new Function(this, 'Lambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = async function(event) { return "hello world"; }'),
        });
    }
}