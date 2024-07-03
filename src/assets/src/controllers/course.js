const { Router } = require("express");
const { Course } = require("../models/Course");
const { create, update, getById, deleteById, signUp } = require("../services/Course");
const { body, validationResult } = require('express-validator');
const { isUser } = require("../midlewares/guards");
const { parseErrors } = require("../../util");

//todo replace with real router
const courseRouter = Router()

courseRouter.get('/create', isUser(), async (req, res) => {
    res.render('create')
})

courseRouter.post('/create', isUser(),
    body('title').trim().isLength({min: 5}).withMessage('Name must be at least 5 characters long'),
    body('type').trim().isLength({min: 3}).withMessage('Type must be at least 3 characters long'),
    body('certificate').trim().isLength({min: 2}).withMessage('Certificate must be at least 2 characters long'),
    body('price').trim().isNumeric({min: 0}).withMessage('Price must be positive number'),
    body('image').trim().isURL({require_tld: false }).withMessage('Image must be valid url'),
    async (req, res) => {
        try {
            const validation = validationResult(req)
            if (validation.errors.length) {
                throw validation.errors
            }
            //console.log(req.body)
            //console.log('-------------->',validation.errors.length)
            const result = await create(req.body, req.user._id)
            res.redirect('/catalog')
        } catch (err) {
            res.render('create', { data: req.body, errors: parseErrors(err).errors })
        }
    }
)

courseRouter.get('/edit/:id', isUser(), async (req, res) => {
    const course=await getById(req.params.id)
    if(!course){
        res.render('404')
        return
    }
    const isOwner=req.user._id==course.owner.toString()
    if(!isOwner){
        res.redirect('/login')
        return
    }
    res.render('edit',{data: course})
})

courseRouter.post('/edit/:id', isUser(),
body('title').trim().isLength({min: 5}).withMessage('Name must be at least 5 characters long'),
body('type').trim().isLength({min: 3}).withMessage('Type must be at least 3 characters long'),
body('certificate').trim().isLength({min: 2}).withMessage('Certificate must be at least 2 characters long'),
body('price').trim().isNumeric({min: 0}).withMessage('Price must be positive number'),
body('image').trim().isURL({require_tld: false }).withMessage('Image must be valid url'),
    async (req, res) => {
        const courseId=req.params.id
        const userId=req.user._id
        try {
            const validation = validationResult(req)
            if (validation.errors.length) {
                throw validation.errors
            }
            const result = await update(courseId, req.body, userId)
            //console.log(result)
            res.redirect('/catalog/'+courseId)
        } catch (err) {
            res.render('edit', { data: req.body, errors: parseErrors(err).errors })
        }
    }
)

courseRouter.get('/signUp/:id', isUser(), async (req, res) => {
    const courseId=req.params.id
    const userId=req.user._id
    //console.log(courseId, userId)
    try {
        const result = await signUp(courseId, userId)
        
        res.redirect('/')
    } catch (err) {
        res.redirect('/catalog/'+courseId)
    }
}
)


courseRouter.get('/delete/:id', isUser(), async (req, res) => {
        const courseId=req.params.id
        const userId=req.user._id
        try {
            const result = await deleteById(courseId, userId)
            
            res.redirect('/')
        } catch (err) {
            res.redirect('/catalog/'+courseId)
        }
    }
)


module.exports = {
    courseRouter
}