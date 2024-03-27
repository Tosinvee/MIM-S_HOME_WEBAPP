const joi = require('joi')

const Schema = joi.object({
    name:joi.string().required(),
    age:joi.number()
})