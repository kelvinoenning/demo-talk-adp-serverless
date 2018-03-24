// let fn = require('./handler/user/new')

// fn.run({body: JSON.stringify({ email: 'kelvin@adapcon.com.br', nick: 'kelvin', age: '25' })}, undefined, (err, data) => {
//     console.log(err, data)
// })

// let fn = require('./handler/user/list')

// fn.run(undefined, undefined, (err, data) => {
//     console.log(err, data)
// })

let fn = require("./handler/user/get");

fn.run(
  { body: JSON.stringify({ email: "kelvinstang@hotmail.com" }) },
  undefined,
  (err, data) => {
    console.log(err, data);
  }
);
