let fn = require('./handler/user/new')

fn.run({body:{ email: 'kelvin@adapcon.com.br', nick: 'kelvin', age: '25' }}, undefined, (err, data) => {
    console.log(err, data)
})