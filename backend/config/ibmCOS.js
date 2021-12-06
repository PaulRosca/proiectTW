import IBMCOS from "ibm-cos-sdk";

const CONFIG = {
  endpoint: 's3.eu-de.cloud-object-storage.appdomain.cloud',
  apiKeyId: 'yGI-9BMC9zryjFT9fxOOIqj25wE2ouHpHJxuKTKQimC4',
  serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/8d5cf6a4f0bc4754893d68f2941ec2f3:18ca5b8e-85fb-4e78-8e09-c3adffe0d3e3::',
  signatureVersion: 'iam',
};
const cos = new IBMCOS.S3(CONFIG);

export default cos;
