"use strict";

const { dispath } = require("../../util/response");
// const { toJson, toObject } = require('../../util/parser')
const { list: userList } = require("../../object/User");

// const checkParameters = ({email, nick, age} = {}) => (!email || !nick || !age) ? { status: 401 } : { status: undefined }

module.exports.run = (event, context, callback) => {

  // let body = toObject(event.body);

  // let { status } = checkParameters(body);
  // if (status) return dispath({ status, callback });

  userList()
    .then(users =>
      dispath({ status: 200, body: { users }, callback })
    )
    .catch(err => dispath({ status: 500, body: err, callback }));
};
