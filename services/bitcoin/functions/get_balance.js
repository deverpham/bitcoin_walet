const PROVIDER = require('./providers');
function getBalance(address) {
    return PROVIDER.getBalance(address)
}

module.exports = {getBalance};