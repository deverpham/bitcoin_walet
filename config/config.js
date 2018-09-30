const APP_CONFIG = require('./app.json');
const DB_CONFIG = require('./database.json');
const bitcoin = require('bitcoinjs-lib');
function getNetwork() {
    return APP_CONFIG.network =="mainnet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
}
module.exports = {network: getNetwork(), networkString: APP_CONFIG.network, DB_CONFIG, server: APP_CONFIG.server}