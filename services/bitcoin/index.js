const {generateWallet} = require('./functions/generate_wallet');
const {getBalance} = require('./functions/get_balance');
const {sendMoney} = require('./functions/send_money');
const wallet = generateWallet();
const privateKey = 'KzNUg7isY3WQkDihM2S71uVrL3Er8s6j1GMbg3btySAt9GrEyQQx';
const address = 'n14s3bnPPtMNPHcuA6eAJGRFwiMbkeDd8x';
const to_address_key= 'Kz5n51hQhR9BhLGsFQpjbpq2ayhs3v4QWtHxKMJm5Rh9rK7Y8iT6';
const to_address= 'mzasvQoroGVFiPwEaZ8NyEWxt9QAPUy3Ju';
//getBalance(address).then(result => console.log(result));
sendMoney(privateKey,address,'mzasvQoroGVFiPwEaZ8NyEWxt9QAPUy3Ju',0.002)
//.catch(err => console.log(err))
