const mongoose = require('mongoose');
const auoInCrease = require('mongodb-autoincrement');

module.exports = mongoose.model('users', new mongoose.Schema({
    email: 'string',
    password: 'string',
    wallet: 'string',
    privateKey: 'string',
    phonenumber: 'string',
    token: 'string',
    expired: 'date'
}).plugin(auoInCrease.mongoosePlugin, {
    field: 'userid'
}))