const kx = require('./connection')

kx.schema.createTable('clucks', table => {
  table.increments('id')
  table.string('username')
  table.text('content')
  table.string('image_path')
  table.timestamps(false, true)
}).then(() => process.exit())
  .catch(() => process.exit())


  kx.schema.createTable('tags', table => {
    table.increments('id')
    table.string('hashtag')
    table.integer('number')
    table.timestamps(false, true)
  }).then(() =>{console.log('created tag')
    process.exit()})
    .catch(() => process.exit())
