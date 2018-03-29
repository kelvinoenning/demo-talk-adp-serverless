'use strict';

// Função que será chamada pelo Lambda;
module.exports.check = (event, context, callback) => {

  const response = { // Objeto de resposta para a chamada HTTP.
    statusCode: 200, // Seta o status da requisição como 200.
    headers: { // Adiciona o pacote de headers na requisição
      "Access-Control-Allow-Origin": "*"
    }
  };

  callback(null, response); // Envia a resposta para o API Gateway.

  // Lembrando que neste caso é uma resposta para uma função de HTTP.
  // Somente o evento do API Gateway entende (statusCode) e (headers) no objeto.
};