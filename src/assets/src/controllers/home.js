const { Router } = require("express");
const { Course } = require("../models/Course");
const { getRecent, getAll, getById } = require("../services/course");
const { getBy, getSigned } = require("../services/user");

//todo replace with real router
const homeRouter=Router()

homeRouter.get('/',async (req,res)=>{
    const courses=await getRecent()
    console.log(courses)
    res.render('home',{courses})
})


homeRouter.get('/catalog',async (req,res)=>{
    const courses=await getAll()
    res.render('catalog',{courses})
})

homeRouter.get('/catalog/:id',async (req,res)=>{
    //console.log(req.params.id)
    const course=await getById(req.params.id)
    
    if(!course){
        res.render('404')
        return
    }
    //console.log(course.owner)
    const by=await getBy(course.owner) //вземам мейла на автора
    

    const isOwner=req.user?._id == course.owner.toString()
    const isSigned=Boolean(course.signUpList.find(l=> req.user?._id==l.toString()))
    const list=[]
    const signed=Boolean(course.signUpList.length)
    if(signed){
        for(const e of course.signUpList){
            const result=await getSigned(e)
            list.push(result)
        }
    }
    const listing=list.join(', ')
    res.render('details',{course,isOwner, isSigned, by, listing})
})

module.exports={
    homeRouter
}