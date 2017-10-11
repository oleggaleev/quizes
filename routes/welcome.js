const Express = require('express')
const router = Express.Router()
const kx = require('../db/connection')
const moment = require('moment');
moment().format();

router.get('/', (request, response) => {
  response.render('home')
})


router.get('/clucks/show', (request, response) => {


kx
  .select()
  .from('clucks')
  .orderBy('created_at', 'DESC')
  .then((clucks => {
    response.render('clucks/show', {clucks, moment:moment})
  })
)
})


// Assign to `module.exports` the object that you want the file export when it
// is required with the `require` function.
module.exports = router
