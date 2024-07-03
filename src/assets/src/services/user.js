const { Course } = require('../models/Course')
const {User}= require('../models/User')
const bcrypt=require('bcrypt')
const { getAll } = require('./course')

const identityName='username'

async function register(identity,eml, password){
    const existing= await User.findOne({[identityName]: identity})

    if(existing){
        throw new Error(`This user ${identityName} ${identity} is already in use`)
    }
    const user=new User ({
        [identityName]: identity,
        email: eml,
        password: await bcrypt.hash(password, 10)

    })
    await user.save()

    return user
}

async function login(identity,password){
    const user= await User.findOne({[identityName]: identity})
    if(!user){
        throw new Error('Incorect user name or password')
    }

    const match=await bcrypt.compare(password,user.password)
    if(!match){
        throw new Error('Incorect user name or password')
    }

    return user
}

async function getBy(id){

    const usr=await User.findOne({_id: id}) 
    const by=usr.email
    return by
}

async function getSigned(id){

    const usr=await User.findOne({_id: id}) 
    const by=usr.username
    return by
}

async function getSuc(id){
    const courses=await Course.find({signUpList: id}).lean()
    return courses
}

async function getSc(id){
    const courses=await Course.find({owner: id}).lean()
    return courses
}


module.exports={
    register,
    login,
    getBy,
    getSigned,
    getSc,
    getSuc

}