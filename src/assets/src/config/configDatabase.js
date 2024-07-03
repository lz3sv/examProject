const mongoose=require('mongoose')
require('../models/User')
require('../models/Course')

async function configDatabase(){
    //const connectionString='mongodb://localhost:27017/testdb'
    const connectionString='mongodb://localhost:27017/courseBook'
    //await mongoose.connect(connectionString)
    
    await mongoose.connect(connectionString)
    
    console.log('Database connected')
}

module.exports={
    configDatabase
}