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
  let params = event.pathParameters
  let body = JSON.parse(event.body)
  
  //Verifique que vamos usar o parametro do email para servir como id para atualizar
  //E vamos usar o corpo da requisicao para o resto dos dados
  if (!params.email || !body.nick) {
    return response(401, undefined, callback);
  }
 
  // Atualiza o usuario no DynamoDB
  // AGORA ESTAMOS ATUALIZANDO UM USUARIO COM BASE EM UM OBJETO COMPLETO, RETIRANDO O EMAIL QUE ELE JA TEM COMO ID!
  // DOC Dynamo: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property 
  dynamo.update(
    {
      TableName: "Users",
      Key: { 
        email : params.email 
      },
      UpdateExpression: 'set nick = :newNick',
      ExpressionAttributeValues: {
        ':newNick' : body.nick
      }
    },
    (err, data) => {
      // O status de resposta em caso de erro, deve ser tratado para não ser somente 401.
      // O status também pode ser por usuário já criado na base de dados em geral.
      if (err) return response(401, err, callback);
      return response(200, undefined, callback);
    }
  );
};
