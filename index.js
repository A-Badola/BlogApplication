const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser: true})

const app = new express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const ejs=require('ejs')

app.set('view engine','ejs')
app.use(express.static('public'))

const fileUpload = require('express-fileupload')

app.use(fileUpload())

const validateMiddleware = require('./middleware/validationMiddleware')
app.use('/posts/store', validateMiddleware)

const expressSession = require('express-session')
app.use(expressSession({
  secret: 'gram patoti'
}))

const flash = require('connect-flash')
app.use(flash());

const authMiddleware = require('./middleware/authMiddleware')
const redirectifauthMiddleware = require('./middleware/redirectifauthMiddleware')

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const storeUserController = require('./controllers/storeUser')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')
const getAboutController = require('./controllers/getAbout')
const getContactController = require('./controllers/getContact')
const newUserController = require('./controllers/newUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')



global.loggedIn = null;

app.use("*",(req,res,next)=>{
  loggedIn = req.session.userId;
  next()
})


app.listen(4000,()=>{
  console.log('App listening on port 4000')
})

app.get('/', homeController)

app.get('/about',getAboutController)

app.get('/contact',getContactController)

app.get('/post/:id', getPostController)

app.get('/posts/new',authMiddleware,newPostController)

app.post('/posts/store',authMiddleware,storePostController)

app.get('/auth/register',redirectifauthMiddleware,newUserController)

app.post('/user/register',redirectifauthMiddleware,storeUserController)

app.get('/auth/login',redirectifauthMiddleware, loginController)

app.post('/user/login',redirectifauthMiddleware,loginUserController)

app.get('/auth/logout',logoutController)

app.use((req,res)=>{
  res.render('notFound')
})