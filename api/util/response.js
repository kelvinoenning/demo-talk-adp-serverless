const required = require("./required");

module.exports.dispath = ({
  error,
  status = required`status`,
  body,
  callback = required`callback`
}) => {
  callback(error, {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  });
};
