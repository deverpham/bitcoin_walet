const app = require('express')();
const Routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
// Import server config
const { server } = require('./config/config')
// Support json
app.use(bodyParser.json());
// Support : form/urlencoded
app.use(bodyParser.urlencoded());
// Enable cross-origin for all domain
app.use(cors({
    origin: '*'
}))
// Load Router
app.use(Routes);
// Start app
app.listen(server.port, console.log('server start successfully')) 