var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const items = require('./routes/api/items');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});



app.use('/api', items);

const port =  5000;

const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Example app listening at http://${host}:${port}`)
})