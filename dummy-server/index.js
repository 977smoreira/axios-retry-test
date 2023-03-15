const express = require('express')
const app = express()

const log = console.log;

console.log = function(){
    log.apply(console, [new Date(), ...arguments]);
};

app.get('/', function (req, res) {
  console.log("HIT");

  res.sendStatus(500)
})

app.listen(3000)