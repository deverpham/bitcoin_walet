// Import Middleware
const validate = require('./middlewares/validate');
const jwtService = require('./middlewares/jwt');
const { Router } = require('express');
// Import controller
const authController = require('./controllers/auth');
const dashboardController = require('./controllers/dashboard');

const router = Router();
// Load validation middleware
validate(router);

/**
 * EXPOSE API
 * response SUCCESS: {
 *  status: 'success',
 *  payload: Object
 * }
 * 
 * response ERROR : {
 *  status: 'error',
 *  payload: message || object  {statusCode, ...}
 * }
 */

// Register API
router.post('/register', (req, res) => {
    authController.register(req.body)
        .then(result => {
            res.json({
                status: 'success',
                payload: result
            })
        })
        .catch(err => res.status(400).json({
            status: 'error',
            payload: err
        }))
})

//Login API
router.post('/login', (req, res) => {
    console.log(req.body)
    authController.login(req.body)
        .then(result => {
            res.json({
                status: 'success',
                payload: result
            })
        })
        .catch(err => res.status(400).json({
            status: 'error',
            payload: err
        }))
})

//Analytics API
router.get('/analytics', jwtService.checkUser() /* Required logged user */, (req, res) => {
    dashboardController.analytics()
        .then(result => res.json({
            status: 'success',
            payload: result
        }))
        .catch(err => res.status(400).json({
            status: 'error',
            payload: err
        }))
})

//Send money API
router.post('/send', jwtService.checkUser() /* Required logged user */, (req, res) => {
    // Get wallet of user from req.user ( come from jwt token )
    const wallet = {
        address: req.user.wallet,
        privateKey: req.user.privateKey
    }
    dashboardController
        .sendMoney(wallet, req.body.to, req.body.amount)
        .then(result => res.json({
            status: 'success',
            payload: result
        }))
        .catch(err => res.status(400).json({
            status: 'error',
            payload: err
        }))

})

module.exports = router;