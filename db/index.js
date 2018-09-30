const mongoose = require('mongoose');
const {DB_CONFIG} = require('../config/config');
const UserModel = require('./models/users');
function connect() {
    return mongoose.connect(`mongodb://${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`)
}
connect();
module.exports = {
    UserModel
}