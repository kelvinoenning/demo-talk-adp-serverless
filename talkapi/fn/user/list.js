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

  // Lista todos os usuarios da base de dados
  // A propriedade <Expect> indica que voce espera que este usuario nao existe no banco! Se existir nao salva!
  // DOC Dynamo: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property 
  dynamo.scan(
    {
      TableName: "Users"
    },
    (err, data) => {
      // O status de resposta em caso de erro, deve ser tratado para não ser somente 401.
      if (err) return response(401, err, callback);
      return response(200, data.Items, callback); //Quando usamos <Query> ou <Scan> a propriedade muda de <data.Item> para <data.Items>
    }
  );
};
