const { Router } = require("express");
const { isGuest, isUser } = require("../midlewares/guards");
const { register, login, getSc, getSuc } = require("../services/user");
const { createToken } = require("../services/jwt");
const { parseErrors } = require("../../util");
const { body, validationResult } = require('express-validator')


//todo replace with real router
const userRouter = Router()

userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register')
})

userRouter.post('/register', isGuest(),
    body('username').trim().isLength({ min: 2 }).withMessage('User name must be at least 2 character long'),
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('E-mail must be at least 10 character long'),
    body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 character long'),
    body('repass').trim().isLength({ min: 4 }).custom((value, { req }) => value == req.body.password).withMessage('Password don\'t match'),
    async (req, res) => {
        const { username, email, password } = req.body
//console.log(req.body)
        try {
            const validation = validationResult(req)
//console.log('validation ----------------->', validation.errors.length)
            if (validation.errors.length) {
                throw validation.errors
            }
//console.log('registrirane ----------------->')
            const result = await register(username, email, password)
            const token = createToken(result)
            res.cookie('token', token)
            res.redirect('/')
        } catch (err) {
            res.render('register', { data: { username , email }, errors: parseErrors(err).errors })
        }


    })

userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login')
})

userRouter.post('/login', isGuest(),
    body('email').trim().isEmail(),
    body('password').trim(),
    async (req, res) => {
        const { email, password } = req.body

        try {
            const result = await login(email, password)
            const token = createToken(result)
            res.cookie('token', token)
            res.redirect('/')
        } catch (err) {
            res.render('login', { data: { email }, errors: parseErrors(err).errors })
        }


    })

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

userRouter.get('/profile', isUser(), async(req, res) => {
    const { email, _id } = req.user
    //console.log(_id)
    const result= await getSc(_id)
    const result2=await getSuc(_id)
    console.log(result2)
    
    res.render('profile',{email, result,result2})
})


module.exports = {
    userRouter
}