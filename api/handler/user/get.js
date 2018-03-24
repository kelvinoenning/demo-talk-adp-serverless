"use strict";

const { dispath } = require("../../util/response");
const { toJson, toObject } = require("../../util/parser");
const { get: getUser } = require("../../object/User");

const checkParameters = ({ email } = {}) =>
  !email ? { status: 401 } : { status: undefined };

module.exports.run = (event, context, callback) => {
  let body = toObject(event.pathParameters);

  let { status } = checkParameters(body);
  if (status) return dispath({ status, callback });

  getUser({ email: body.email })
    .then(user =>
      dispath({ status: 201, body: { user: user.toString() }, callback })
    )
    .catch(err => dispath({ status: 200, body: err, callback }));
};
