const PROVIDER = require('./providers');
function sendMoney(privateKey,from, to, amount) {
    return PROVIDER.sendTransaction({
        from,
        to,
        privKeyWIF: privateKey,
        btc: amount,
        network :  process.env.NODE_ENV == 'prod'? 'mainnet': 'testnet',
        dryrun: true
    })
}
module.exports = {sendMoney}