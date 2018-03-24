"use strict";

// Importa o AWS-SDK
const aws = require("aws-sdk");

// Instancia um Dynamodb
const dynamo = new aws.DynamoDB.DocumentClient({
  region: "us-east-1"
});

// Funcao externalizada para responder a requisicao que foi feita pelo cliente.
function response(status, body, callback){
  const response = {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body
  };

  callback(null, response);
}

// Funcao Lambda
module.exports.run = (event, context, callback) => {
  let body;

  // Converte e valida se o body da requisicao e um JSON;
  try{
    body = JSON.parse(event.body);
  } catch(err) {
    return response(401, { message: 'Request body was not accepted. Required( Contenty-type: application/json )' }, callback);
  }

  // Salva o usuario no DynamoDB
  dynamo.put(
    {
      TableName: "Users",
      Item: {
        email: body.email,
        nick: body.nick
      }
    },
    (err, data) => {

      let status = 200;
      if (err) status = 500;

      return response(status, undefined, callback);
    }
  );
};