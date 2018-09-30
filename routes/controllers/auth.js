const {UserModel} = require('../../db/index')
const sha256 = require('crypto-js/sha256')
const {generateWallet} = require('../../services/bitcoin')
const jwtService = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
function findUserByEmail(email) {
    return UserModel.findOne({
        email
    })
}
class AuthController {
    register(userData) {
        return new Promise((resolve, reject) => {
            findUserByEmail(userData.email)
            .then(records => {
                const wallet = generateWallet();
                if(!records) {
                    userData.userid = 0;
                    userData.password = sha256(userData.password);
                    userData.wallet = wallet.address;
                    userData.privateKey = wallet.privateKey
                    const user = new UserModel(userData);
                    user.save()
                    .then(result => {
                        resolve(Object.assign({}, {
                            email: result.email,
                            id: result.userid,
                            wallet: result.wallet,
                            phonenumber: result.phonenumber
                        }));
                    })
                    .catch(err => reject(err))
                } else {
                    reject('user already exist');
                }
            })
        })
    }
    login(userData) {
        return new Promise((resolve, reject) => {
            
        console.log(userData)
            const {email, password} = userData;
            UserModel.findOne({
                email,
                password: sha256(password).toString()
            }).then(record => {
                if(!record) {
                    reject('user not found')
                } else {
                    const user = Object.assign({},{
                        id: record.userid,
                        email: record.email,
                        wallet: record.wallet
                    })
                    const token = jwtService.pack(user)
                    user.token = token;
                    resolve(user)
                }
            })
            .catch(err => {
                console.log('err')
                console.log(err)
                reject(err)
            })
        })
    }
    sign(req, res, next) {
        return jwtService.checkUser
      }
    
}
module.exports = new AuthController();