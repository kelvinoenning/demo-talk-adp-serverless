"use strict";

const { dispath } = require("../../util/response");
const { toJson, toObject } = require('../../util/parser')
const { new: newUser } = require("../../object/User");

const checkParameters = ({email, nick, age} = {}) => (!email || !nick || !age) ? { status: 401 } : { status: undefined }

module.exports.run = (event, context, callback) => {
  
  let body = toObject(event.body);

  let { status } = checkParameters(body);
  if (status) return dispath({ status, callback });

  newUser({ email: body.email, nick: body.nick, age: body.age })
    .then(user =>
      dispath({ status: 201, body: { user: user.toString() }, callback })
    )
    .catch(err => dispath({ status: 200, body: err, callback }));
};
