const { UserModel } = require('../../db/index')
const sha256 = require('crypto-js/sha256')
const { generateWallet } = require('../../services/bitcoin')
const jwtService = require('../middlewares/jwt');

//Private Function
function findUserByEmail(email) {
    return UserModel.findOne({
        email
    })
}
class AuthController {
    // Register User Func
    register(userData) {
        return new Promise((resolve, reject) => {
            // Check email is exist or not
            findUserByEmail(userData.email)
                .then(records => {
                    // Random a wallet address, a wallet key
                    const wallet = generateWallet();
                    if (!records) { /* CASE: email not found  */
                        userData.userid = 0; /* Auto increase filed : userid */
                        userData.password = sha256(userData.password); /* Hash the password */
                        userData.wallet = wallet.address;
                        userData.privateKey = wallet.privateKey

                        /* Save user to database */
                        const user = new UserModel(userData);
                        user.save()
                            .then(result => {
                                const user = {
                                    id: result.userid,
                                    email: result.email,
                                    wallet: result.wallet,
                                    phonenumber: result.phonenumber
                                };
                                user.token = jwtService.pack(user);
                                resolve(Object.assign({}, user));
                            })
                            .catch(err => reject(err))

                        /* ! Save user to database */

                    } else { /* CASE: email  exist  */
                        reject('user already exist');
                    }
                })
        })
    }

    // Login Func
    login(userData) {
        return new Promise((resolve, reject) => {
            const { email, password } = userData;
            UserModel.findOne({
                email,
                password: sha256(password).toString()
            }).then(record => {
                if (!record) { /*CASE: user's information is incorrect */
                    reject('user not found')
                } else { /*CASE: user's information is correct */
                    const user = Object.assign({}, {
                        id: record.userid,
                        email: record.email,
                        wallet: record.wallet
                    })
                    // Create JWT Token
                    const token = jwtService.pack(user)
                    user.token = token;
                    resolve(user)
                }
            })
                .catch(err => {
                    reject(err)
                })
        })
    }

}
module.exports = new AuthController();