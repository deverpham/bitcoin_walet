
const jwt = require('jwt-simple');
const jwtRouter = require('express-jwt');
const {server}  = require('../../config/config');
const {UserModel} = require('../../db')
const JWT_SECRET = server.secret;
class JwtService {
  pack(payload) {
    return jwt.encode(payload, JWT_SECRET)
  }
  unpack(payload) {
    return jwt.decode(payload, JWT_SECRET);
  }
  checkUser() {
      return jwtRouter({
        secret: JWT_SECRET,
        requestProperty: 'jwtUser', // prevent jwt from overwriting req.user
        isRevoked: this.saveUserToReq
      })
  }
  saveUserToReq(req, user, done) {
      console.log(user)
    const {id, email} = user;
    UserModel.findOne({
      userid: id,
      email
    })
      .then((user) => {
        if(!user) done(new Error('not find this user'))
        else {
          req.user = user;
          done(null, false) // false means this token hasn't been revoked yet (token still valid)
        }
      })
      .catch(err => done(err))
  }
}
module.exports = new JwtService();
