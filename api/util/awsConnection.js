const aws = require("aws-sdk");

const DEFAULT_REGION = "us-east-1";

module.exports.dynamo = new aws.DynamoDB.DocumentClient({ region: DEFAULT_REGION });
