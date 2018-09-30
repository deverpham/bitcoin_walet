const express = require('express');
const app = express();
const Routes = require('./routes/routes');
const bodyParser = require('body-parser');
const {server} = require('./config/config')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(Routes);
app.listen(server.port, () => {
    console.log('app started');
})