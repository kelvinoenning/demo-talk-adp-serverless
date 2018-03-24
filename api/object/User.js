const required = require("../util/required");
const { dynamo } = require("../util/awsConnection");

const DEFAULT_TABLE_NAME = "Users";

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

  delete() {
    return dynamo
      .delete({
        TableName: DEFAULT_TABLE_NAME,
        Key: {
          email: this.email
        }
      })
      .promise()
      .then(() => {
        return { email: this.email };
      })
      .catch(err => decodeError(err));
  }

  update({nick = required`nick`, age = required`age`}) {
    return dynamo
      .update({
        TableName: DEFAULT_TABLE_NAME,
        Key: {
          email: this.email
        },
        UpdateExpression: 'set nick = :mynick, age = :age',
        ExpressionAttributeValues: {
          ':mynick' : nick,
          ':age': age
        }
      })
      .promise()
      .then(() => {
        this._nick = nick;
        this._age = age;
        return this;
      })
      .catch(err => decodeError(err));
  }

  toString() {
    console.log(this);
    return { email: this.email, nick: this.nick, age: this.age };
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
        email,
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

module.exports.get = ({ email = required`email` }) => {
  return dynamo
    .get({
      TableName: DEFAULT_TABLE_NAME,
      Key: {
        email
      },
      Expected: {
        id: {
          Exists: true
        }
      }
    })
    .promise()
    .then(
      res =>
        new User({
          email: res.Item.email,
          nick: res.Item.nick,
          age: res.Item.age
        })
    )
    .catch(err => decodeError(err));
};

module.exports.list = () => {
  return dynamo
    .scan({
      TableName: DEFAULT_TABLE_NAME
    })
    .promise()
    .then(result => result.Items)
    .catch(err => decodeError(err));
};
