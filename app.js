const Express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// 🛣 ROUTES
const welcome = require('./routes/welcome')
const clucks = require('./routes/clucks')


const app = Express()

app.set('view engine', 'ejs')

app.use(Express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

//
app.use('/', welcome)
app.use('/clucks', clucks)

const PORT = 7653;
app.listen(
  PORT,
  () => console.log(`💁 Server listening on http://localhost:${PORT}`)
)
