const express = require('express');
const app = express();
const path = require('path');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

//middlewares
app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root ',
  password : '',
  database : 'portalweb'
});

connection.connect();

connection.query('SELECT * from < table name >', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();


app.get('/', (req, res) => res.render('sesion'));
 app.get('/sesion',(req,res)=> res.render('login'));
    app.get('/sesion/ajustes',(req,res)=> res.render('login'));
    app.get('/sesion/curso',(req,res)=> res.render('login'));
    app.get('/sesion/eventos',(req,res)=> res.render('login'));
    app.get('/sesion/horario',(req,res)=> res.render('login'));
    app.get('/sesion/notas',(req,res)=> res.render('login'));
    app.get('/sesion/perfil',(req,res)=> res.render('login'));
 app.get('/Admin',(req,res)=> res.render('login'));
    app.get('/Admin/mAlumno',(req,res)=> res.render('login'));

const listener = app.listen(3000, () =>
  console.log(`Running app on ${listener.address().address}${listener.address().port}`)
);
