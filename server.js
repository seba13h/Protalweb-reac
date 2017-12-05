
const express = require('express');
const app = express();
const path = require('path');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'portalweb'
});

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

//middlewares
app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/data-get-all-rut-user', function(req, res){
  connection.query('SELECT rut_alu as rut, contraseña, tipo_usuario FROM alumno', (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-rut-teacher', function(req, res){
  connection.query('SELECT rut_prof as rut,nom_prof,email,telefono, contraseña,tipo_usuario FROM profesor', (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-rut-admin', function(req, res){
  connection.query('SELECT rut_admin as rut, contraseña, tipo_usuario FROM administrador', (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-user', function(req, res){
  connection.query('SELECT * FROM alumno', (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-ramo', function(req, res){
  connection.query('SELECT * FROM ramo', (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-curso', function(req, res){
  connection.query('SELECT * FROM curso', (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-horario', function(req, res){
  connection.query('SELECT * FROM horario', (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-teacher', function(req, res){
  connection.query('SELECT * FROM profesor', (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-notasUsers', function(req, res){
  connection.query('SELECT ramo.rut_prof as rut,alumno.nom_alu, detalle_nota.nota, detalle_nota.numero_nota FROM alumno  inner join  detalle_nota on alumno.rut_alu  = detalle_nota.rut_alu  inner join ramo on ramo.cod_ramo=detalle_nota.cod_ramo ', (error, results, fields) => {
    res.json(results);
  });
});



app.get('/data-get-all-menu-teacher', function(req, res){
  connection.query('SELECT profesor.rut_prof as rut,profesor.nom_prof, ramo.cod_ramo, ramo.nom_ramo, horario.cod_curso ,horario.dia ,horario.num_bloque,horario.sala_clases ,horario.hora  FROM profesor  inner join  ramo on profesor.rut_prof  = ramo.rut_prof  inner join horario on horario.cod_ramo=ramo.cod_ramo ',
  (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-menu-teacher2', function(req, res){
  connection.query
  ('SELECT profesor.rut_prof as rut, prueba.fecha, prueba.bloque, prueba.descripcion,prueba.sala_clases ,ramo.nom_ramo,ramo.cod_ramo ,prueba.cod_curso FROM profesor inner join ramo on profesor.rut_prof = ramo.rut_prof inner join prueba on prueba.rut_prof= ramo.rut_prof AND prueba.cod_ramo = ramo.cod_ramo',
  (error, results, fields) => {
    res.json(results);
  });
});
//,
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
   app.get('/Admin/mProfesor',(req,res)=> res.render('login'));
   app.get('/Admin/mRamos',(req,res)=> res.render('login'));
   app.get('/Admin/mCursos',(req,res)=> res.render('login'));
   app.get('/Admin/mHorario',(req,res)=> res.render('login'));

app.get('/Profesor',(req,res)=> res.render('login'));
   app.get('/Profesor/Eventos',(req,res)=> res.render('login'));
   app.get('/Profesor/Notas',(req,res)=> res.render('login'));
   app.get('/Profesor/Perfil',(req,res)=> res.render('login'));

const listener = app.listen(3000, () =>
  console.log(`Running app on ${listener.address().address}${listener.address().port}`)
);
