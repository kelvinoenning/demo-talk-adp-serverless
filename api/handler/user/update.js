"use strict";

const { dispath } = require("../../util/response");
const { toJson, toObject } = require("../../util/parser");
const { get: getUser } = require("../../object/User");

const checkParameters = ({ email, nick, age } = {}) =>
  !email || !nick || !age ? { status: 401 } : { status: undefined };

module.exports.run = (event, context, callback) => {
  let params = toObject(event.pathParameters);
  let body = toObject(event.body);

  body.email = params.email;

  let { status } = checkParameters(body);
  if (status) return dispath({ status, callback });

  getUser({ email: body.email })
    .then(user => user.update({ nick: body.nick, age: body.age }))
    .then(user =>
      dispath({ status: 200, body: { user: user.toString() }, callback })
    )
    .catch(err => dispath({ status: 200, body: err, callback }));
};
