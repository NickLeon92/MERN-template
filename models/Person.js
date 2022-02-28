const {model, Schema} = require('mongoose')

const personSchema = new Schema({
    firstName: {
        type:String
    },
    lastName: {
        type:String
    },
    age: {
        type:Number
    }
})

const Person = model('Person', personSchema)

module.exports = Person