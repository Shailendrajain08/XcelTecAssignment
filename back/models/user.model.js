const mongoose = require('mongoose');


const schema = mongoose.Schema;

const userSchema = new schema({
    userName:{
        type: String
    },
    userEmail:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    created_at:{
        type: Number,
        default: Date.now().valueOf()
    },
    updated_at:{
        type: Number,
        default: Date.now().valueOf()
    }

})

module.exports = mongoose.model('User', userSchema)