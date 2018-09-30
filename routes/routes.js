const validate = require('./validate');
const {Router} = require('express');
const authController = require('./controllers/auth')
const dashboardController = require('./controllers/dashboard')
const router = Router();
const jwtService   = require('./middlewares/jwt')
validate(router);
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
router.get('/analytics',jwtService.checkUser(), (req, res) => {
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
router.post('/send', jwtService.checkUser() , (req, res) => {
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