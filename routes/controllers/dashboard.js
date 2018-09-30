const {UserModel} = require('../../db')
const shuffle = require('array-shuffle');
const filters = require('loopback-filters');
const {sendMoney} = require('../../services/bitcoin')
function getUsers() {
    return new Promise(resolve => {
        UserModel.find({})
            .then(records => resolve(records))
    })
}
class Dashboard {
     analytics() {
        return new Promise((resolve, reject) => {
            getUsers().then(users => {
                const total = users.length;
                const wallets  = [];
                const userShortList = filters(shuffle(users), {
                    limit: 3
                })
                userShortList.map(user => {
                    wallets.push({
                        id: user.userid,
                        wallet: user.wallet
                    })
                })
                resolve({
                    total,
                    wallets
                });
            })
        })
    }
    sendMoney(wallet, to, amount) {
        return sendMoney(wallet.privateKey, wallet.address, to, amount)
    }
}
module.exports = new Dashboard()