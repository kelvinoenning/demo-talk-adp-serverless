"use strict";

const { dispath } = require("../util/response");

module.exports.check = (event, context, callback) => {
  dispath({
    status: 200,
    body: ":D",
    callback
  });
};
