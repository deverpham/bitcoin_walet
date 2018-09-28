const {generateWallet} = require('./functions/generate_wallet');
const {getBalance} = require('./functions/get_balance');
const {sendMoney} = require('./functions/send_money');
//const wallet = generateWallet();

const privateKey = 'cPSS7EaSD3J5H5eDXtxa9X1jiCMdmkDJj6AzUAToDmVycT5iutPL';
const address = 'mxGMBuZgS3ysHkRBySVmZZjLS3iR1j5dqi';
const to_address_key= 'cPfj61NnbRMkXzK8PbQ4ntE8jWJHCQxDUxpUrm2gdBdFsW73wRNz';
const to_address= 'miUeExWuZjdTZu4bguwih1d818m51aKfyN';
const bitcoin = require('bitcoinjs-lib')
const wif = require('wif');
getBalance(address).then(result => console.log(result));

sendMoney(privateKey,address,'miUeExWuZjdTZu4bguwih1d818m51aKfyN',0.02)
.catch(err => console.log(err))
.then(result => console.log(result))

