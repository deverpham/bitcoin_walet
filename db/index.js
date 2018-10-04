const mongoose = require('mongoose');
const { DB_CONFIG } = require('../config/config');
const UserModel = require('./models/users');
/**
 * Connect to database
 * Edit config in file config/database.json
 */
function connect() {
    return mongoose.connect(`mongodb://${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`)
}
/**
 * Auto connect to database when app start
 * it will keep the session during the app running
 */
connect()
    .catch(err => { throw err })
module.exports = {
    UserModel
}