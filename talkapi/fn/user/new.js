"use strict";

// Importa o AWS-SDK
const aws = require("aws-sdk");

// Instancia um Dynamodb
const dynamo = new aws.DynamoDB.DocumentClient({
  region: "us-east-1"
});

// Funcao externalizada para responder a requisicao que foi feita pelo cliente.
function response(status, body, callback) {
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

  //Deve ser implementado tratamento de excecao
  let body = JSON.parse(event.body)
  
  if (!body.email || !body.nick) {
    return response(401, undefined, callback);
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
      if (err) return response(500, err, callback);
      return response(200, undefined, callback);
    }
  );
};
