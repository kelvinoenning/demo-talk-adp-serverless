"use strict";

const { dispath } = require("../../util/response");
const { new: newUser } = require("../../object/User");

const checkParameters = ({ email, nick, age } = {}) => {
  console.log(email, nick, age);
  if (
    typeof email !== "string" ||
    typeof nick !== "string" ||
    typeof age !== "string"
  )
    return { status: 401 };
  return { status: undefined };
};

module.exports.run = (event, context, callback) => {

  console.log('event', event)
  console.log('eventheaders', event.headers)
  console.log('eventheadersbody', event.headers.body)

  let body = event.headers.body;
  console.log(body);

  let { status } = checkParameters(body);
  if (status) return dispath({ status, callback });

  newUser({ email: body.email, nick: body.nick, age: body.age })
    .then(user =>
      dispath({ status: 201, body: { user: user.toString() }, callback })
    )
    .catch(err => dispath({ status: 401, body: err, callback }));
};
