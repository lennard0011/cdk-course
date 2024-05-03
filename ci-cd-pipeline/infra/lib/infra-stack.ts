import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineAppStage } from './demoawspipeline-app-stack';
import { ManualApprovalAction } from 'aws-cdk-lib/aws-codepipeline-actions';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('lennard0011/cdk-course', 'main'),
        commands: [
          'cd ci-cd-pipeline/infra',
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
        primaryOutputDirectory: 'ci-cd-pipeline/infra/cdk.out',
      }),
    })

    const testingStage = pipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '154880243201', region: 'eu-west-1' },
    }));
    
    testingStage.addPost(new ManualApprovalStep('approval'));

    const prodStage = pipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '154880243201', region: 'eu-west-1' },
    }));
  }
}
