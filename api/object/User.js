const required = require("../util/required");
const { dynamo } = require("../util/awsConnection");

const DEFAULT_TABLE_NAME = "User";

const decodeError = err => {
  if (err && err.code === "ConditionalCheckFailedException")
    err = { message: "Este usuário já existe" };
  return Promise.reject(err);
};

class User {
  constructor({
    email = required`email`,
    nick = required`nick`,
    age = required`age`
  }) {
    this._email = email;
    this._nick = nick;
    this._age = age;
  }

  set email(arg) {
    this._email = arg;
  }
  get email() {
    return this._email;
  }

  set nick(arg) {
    this.nick = arg;
  }
  get nick() {
    return this._nick;
  }

  set age(arg) {
    this._age = arg;
  }
  get age() {
    return this._age;
  }

  toString() {
      console.log(this)
      return { email: this.email, nick: this.nick, age: this.age}
  }
}

module.exports.new = ({
  email = required`email`,
  nick = required`nick`,
  age = required`age`
}) => {
  return dynamo
    .put({
      TableName: DEFAULT_TABLE_NAME,
      Item: {
        id: email,
        nick,
        age
      },
      Expected: {
        id: {
          Exists: false
        }
      }
    })
    .promise()
    .then(() => new User({ email, nick, age }))
    .catch(err => decodeError(err));
};
