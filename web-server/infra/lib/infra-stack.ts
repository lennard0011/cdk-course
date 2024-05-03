import * as cdk from "aws-cdk-lib";
import {
  AmazonLinuxGeneration,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  IpAddresses,
  MachineImage,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { readFileSync } from "fs";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "Vpc", {
      vpcName: "web-server-vpc",
      ipAddresses: IpAddresses.cidr("10.0.0.0/16"),
      natGateways: 0,
    });

    const securityGroup = new SecurityGroup(this, "SecurityGroup", {
      vpc,
      securityGroupName: "allow-http-traffic",
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(80),
      "allow-http-traffic"
    );

    const ec2 = new Instance(this, "Instance", {
      vpc,
      instanceName: "web-server-instance",
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
      securityGroup,
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
      machineImage: MachineImage.latestAmazonLinux({
        generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: "demo key pair",
    });
    
    const userData = readFileSync("lib/userdata.sh", "utf-8");

    ec2.addUserData(userData);
  }
}
