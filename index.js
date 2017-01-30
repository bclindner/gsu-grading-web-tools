var express = require('express')
var bodyParser = require('body-parser')
var linter = require('csslint').CSSLint
var app = express()
app.set('view engine', 'pug')
app.use('/static',express.static('static'))
app.use(bodyParser.urlencoded({extended: false}))

//validation widget
app.route('/validate')
  .get( (req,res) => {
    res.render('widgets/validate')
  })
  .post( (req, res) => {
    console.log(req)
    if (req.body == {}) return res.sendStatus(400)
    else {
      var result = linter.verify(req.body.css)
      res.json(result)
    }
  })
//legacy validate url redirection
app.get('/validate.html', (req, res) =>{
  res.redirect('/validate')
})

//index page
app.get('/', (req, res) => {
  res.render('index')
})
app.listen(31415, () =>{
  console.log('listening on port 31415')
})