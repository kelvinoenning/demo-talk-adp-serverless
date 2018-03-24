"use strict";

// Importa o AWS-SDK
const aws = require("aws-sdk");

// Instancia um Dynamodb
const dynamo = new aws.DynamoDB.DocumentClient({
  region: "us-east-1"
});

// Funcao externalizada para responder a requisicao que foi feita pelo cliente.
// Se existir Body para resposta, sempre colocar como formato string.
function response(status, body, callback) {
  const response = {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
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
  // A propriedade <Expect> indica que voce espera que este usuario nao existe no banco! Se existir nao salva!
  // DOC Dynamo: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property 
  dynamo.put(
    {
      TableName: "Users",
      Item: {
        email: body.email,
        nick: body.nick
      },
      Expected: {
        email: {
          Exists: false
        }
      }
    },
    (err, data) => {
      // O status de resposta em caso de erro, deve ser tratado para não ser somente 401.
      // O status também pode ser por usuário já criado na base de dados em geral.
      if (err) return response(401, err, callback);
      return response(201, undefined, callback);
    }
  );
};
