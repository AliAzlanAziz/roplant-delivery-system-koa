// const joi = require('joi')
// const validate = require('koa-joi')

// const signupValidator = validate({
//     body: joi.object({
//         name: joi.string().trim().min(1).max(256),
//         email: joi.string().trim().email().max(32),
//         password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,256}$'))
//     })
// })

// const signinValidator = validate({
//     body: {
//         email: joi.string().trim().email(),
//         password: joi.string().min(8)
//     }
// })

// module.exports = {
//     signupValidator,
//     signinValidator
// }