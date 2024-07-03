const express = require('express')
const cookieParser = require('cookie-parser')
const handlebars=require('express-handlebars')
const { session } = require('../midlewares/session')
const secret='super secreno DANS'

function configExpress(app){

    app.use(cookieParser(secret))
    app.use(session())
        //toDo session middleware

    app.use('/static', express.static('static'))
    app.use(express.urlencoded({extended: true}))


}

module.exports={configExpress}
