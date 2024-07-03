//todo replace user model from exam description

const {Schema, model, Types}=require('mongoose')
const userSchema= new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    collation:{
        locale: 'en',
        strength: 2
    }


})

const User=model('User', userSchema)

module.exports={User}