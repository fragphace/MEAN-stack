express = require 'express'
consolidate = require 'consolidate'
serveStatic = require 'serve-static'
bodyParser = require 'body-parser'
session = require 'express-session'

app = express()
app.engine 'html', consolidate.hogan
app.set 'view engine', 'html'
app.use serveStatic(__dirname + '/public')
app.use bodyParser.json()
app.use bodyParser.urlencoded({ extended: true })
app.use session({ secret: 'abcdef', resave: true, saveUninitialized: true })

app.get '/', (req, res) ->
    res.render 'template.html'

app.listen '4000', ->
    console.log 'App listening on port 4000'