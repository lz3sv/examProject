//toDo import routers

const { homeRouter } = require("../controllers/home")
const { userRouter } = require("../controllers/user")
const { courseRouter } = require("../controllers/course")

function configRoutes(app){
    //todo register routers
    app.use(homeRouter)
    app.use(userRouter)
    app.use(courseRouter)

}

module.exports={
    configRoutes
}