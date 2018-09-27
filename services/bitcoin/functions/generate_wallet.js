const bitcoin = require('bitcoinjs-lib');
const randomstring = require('randomstring');
const network =process.env.NODE_ENV =='prod'? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
function generateWallet() {
    const hash = bitcoin.crypto.sha256(Buffer.from(randomstring.generate(20)));
    const keyPair = bitcoin.ECPair.fromPrivateKey(hash, network);
    const privateKey = keyPair.toWIF();
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network })
    return {privateKey, address}
}
module.exports  = {generateWallet};