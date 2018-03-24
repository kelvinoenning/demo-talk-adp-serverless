'use strict';

module.exports.check = (event, context, callback) => {

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  callback(null, response);

};
