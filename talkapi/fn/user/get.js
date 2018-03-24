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

  //Este projeto nao esta tratando excessao! Isto fica por conta de voces :D

  //Neste estamos pegando o parametro passado na URL;
  //.../users/kelvinstang@hotmail.com     ->  URL configuracaoo YML:  path: /users/{email}
  
  //O {email} é a forma de configurar que neste path sera passado um parametro
  let params = event.pathParameters
  
  if (!params.email) {
    return response(401, undefined, callback);
  }
 
  // Busca o usuario no DynamoDB
  // DOC Dynamo: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property 
  dynamo.get(
    {
      TableName: "Users",
      Key: { // Agora é um <Key>, pois o <Item> e somente para modificar e adicionar!
        email: params.email,
      }
    },
    (err, data) => {
      // O status de resposta em caso de erro, deve ser tratado para não ser somente 401.
      if (err) return response(401, err, callback);
      return response(200, data.Item, callback);
    }
  );
};
