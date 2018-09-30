const validate = require('express-validation');
const joi = require('joi');
const Validation = {
    "/register" : {
        "POST" : {
            body : {
                email: joi.string().min(3).required(),
                password: joi.string().min(6).required(),
                phonenumber: joi.string().min(6).required(),
            }
        }
    },
    "/send" : {
        "POST": {
            body: {
                to: joi.string().min(8).required(),
                amount: joi.number().required()
            }
        }
    }
}

function initValidate(appRouter) {
    const Routes = Object.keys(Validation);
    Routes.map(route => {
        const methods = Object.keys(Validation[route]);
        methods.map(method => {
            appRouter[method.toLowerCase()](route.toLowerCase(), validate(Validation[route][method]))
        })
    })
}
module.exports = initValidate;