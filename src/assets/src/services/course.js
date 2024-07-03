//todo replace with real data service

const {Course}= require('../models/Course')

async function getAll(){
    return Course.find().lean()
}

async function getById(id){
    return Course.findById(id).lean()
}

async function getRecent(){
    return Course.find().sort({$natural: -1}).limit(3).lean()
}


async function create(data,ownerId){

    //To do 
    const record = new Course({
        title:data.title,
        type:data.type,
        certificate:data.certificate,
        image:data.image,
        price:data.price,
        description:data.description,

        owner:ownerId
    })

    await record.save()
    return record
}


async function update(id, data, userId){
    const record=await Course.findById(id)
    if(!record){
        throw new ReferenceError('Record not found '+ id)
    }

    if(record.owner.toString()!= userId){
        throw new Error ('Access denied')
    }

    
    record.title=data.title,
    record.type=data.type,
    record.certificate=data.certificate,
    record.image=data.image,
    record.price=data.price,
    record.description=data.description,


    await record.save()
     
    return record

}


async function signUp(courseId, userId){
    //console.log('wlizam')
    const record=await Course.findById(courseId)
    if(!record){
        throw new ReferenceError('Record not found '+ id)
    }
    //console.log('kursyt e nameren')
    if(record.owner.toString()== userId){
        throw new Error ('Access denied')
    }
    //console.log('ne sym awtor')
    if(record.signUpList.find(l=>l.toString()==userId)){
        return 
    }
    //console.log('ne sym w spisyka')
    record.signUpList.push(userId)
    await record.save()     
}


async function deleteById(id,userId){
    const record=await Course.findById(id)
    if(!record){
        throw new ReferenceError('Record not found '+ id)
    }

    if(record.owner.toString()!= userId){
        throw new Error ('Access denied')
    }

    await Course.findByIdAndDelete(id)
}


module.exports={
    getAll,
    getById,
    getRecent,
    create,
    update,
    deleteById,
    signUp
}