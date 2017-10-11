const Express = require('express')
const multer = require('multer')
const path = require('path')
const router = Express.Router()
const kx = require('../db/connection')
const moment = require('moment');

const upload = multer({dest: path.join(__dirname, '..', 'public', 'uploads')})


router.get('/', (request, response) => {
  response.render('clucks/index')
})


router.get('/show', (request, response) => {



  kx
    .select()
    .from('clucks')
    .orderBy('created_at', 'DESC')
    .then(clucks => {
      response.render('clucks/show', {clucks})
    })

})

router.post('/', upload.single('photo'), (request, response) => {

  const {body} = request;
  console.log(body)

  const {content, username} = request.body;


  if (request.file != null || request.file != undefined) {
    const { filename } = request.file;
    kx
      .insert({ content: content, username: username, image_path: `/uploads/${filename}` })
      .into('clucks')
      .then(() => {
          response.redirect('clucks/show')
    })
  } else {
    kx
      .insert({ content: content, username: username })
      .into('clucks')
      .then(() => {
                response.redirect('clucks/show')
      })
    }
})


router.post('/', (request, response) => {

  const {body} = request;
  console.log(body)

  const {content, username, hashtag, number} = request.body;

if (content.includes('#')) {
  kx
    .insert({ hashtag: hashtag, number: number})
    .into('tags')
    .then(() => {
        response.redirect('clucks/show')
  })
} else {
  kx
    .insert({ content: content, username: username })
    .into('clucks')
    .then(() => {
              response.redirect('clucks/show')
    })
  }
})


// Assign to `module.exports` the object that you want the file export when it
// is required with the `require` function.
module.exports = router
