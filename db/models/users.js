const mongoose = require('mongoose');
// Package to make a field of table auto-increasement 
const auoInCrease = require('mongodb-autoincrement');
/**
 * Create User Model
 * Add AutoIncrease Plugin
 */
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