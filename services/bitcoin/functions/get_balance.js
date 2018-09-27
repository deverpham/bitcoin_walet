const PROVIDER = require('./providers');
function getBalance(address) {
    return PROVIDER.getBalance(address, {
        network: process.env.NODE_ENV == 'prod'? 'mainnet': 'testnet'
    })
}
module.exports = {getBalance};