"use strict";

const aws = require("aws-sdk");

const dynamo = new aws.DynamoDB.DocumentClient({
  region: "us-east-1"
});

module.exports.run = (event, context, callback) => {
  let body = JSON.parse(event.body);

  dynamo.put(
    {
      TableName: "Users",
      Item: {
        email: body.email,
        name: body.name
      }
    },
    (err, data) => {
        
      let status = 200;
      if (err) status = 500;

      const response = {
        statusCode: status,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };

      callback(null, response);
    }
  );
};
