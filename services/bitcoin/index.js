const {generateWallet} = require('./functions/generate_wallet');
const {getBalance} = require('./functions/get_balance');
const wallet = generateWallet();
getBalance(wallet.address).then(result => console.log(result));