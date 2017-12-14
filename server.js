
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
//////// post
app.post('/data-insert-user', function(req, res){
  const data = req.body;
  const { rut, name, email, phone, pw, cod_curso, tipo_usuario} = req.body;
  const query = `insert into alumno(rut_alu, nom_alu, email, telefono, contraseña, cod_curso, tipo_usuario) values('${rut}', '${name}', '${email}', '${phone}', '${pw}', '${cod_curso}', ${tipo_usuario})`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
app.post('/data-insert-teacher', function(req, res){
  const data = req.body;
  const { rut, name, email, phone, pw, tipo_usuario} = req.body;
  const query = `insert into profesor(rut_prof, nom_prof, email, telefono, contraseña, tipo_usuario) values('${rut}', '${name}', '${email}', '${phone}', '${pw}', ${tipo_usuario})`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});

app.post('/data-update-user', function(req, res){
  const data = req.body;
  const { rut, name, email, phone, pw, cod_curso, tipo_usuario} = req.body;
  const query = `update  alumno set  nom_alu = '${name}', email= '${email}', telefono =  '${phone}', contraseña = '${pw}' , cod_curso = '${cod_curso}' , tipo_usuario = ${tipo_usuario} where rut_alu= '${rut}'`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
app.post('/data-update-teacherr', function(req, res){
  const data = req.body;
  const { rut, name, email, phone, pw, tipo_usuario} = req.body;
  const query = `update  profesor set  nom_prof = '${name}', email= '${email}', telefono =  '${phone}', contraseña = '${pw}' , tipo_usuario = ${tipo_usuario} where rut_prof= '${rut}'`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});

app.post('/data-delete-user', function(req, res){
  const data = req.body;
  const rut = data.rut_alu;
  console.error(rut);
  const query = `delete from alumno where rut_alu= '${rut}'`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
  console.error("eliminado....");
});
app.post('/data-delete-teacher', function(req, res){
  const data = req.body;
  const rut = data.rut_prof;
  console.error(rut);
  const query = `delete from profesor where rut_prof= '${rut}'`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
  console.error("eliminado....");
});


////// GET
app.get('/data-get-all-rut-user', function(req, res){
  connection.query('SELECT rut_alu as rut, nom_alu,email,telefono, contraseña, tipo_usuario,cod_curso FROM alumno', (error, results, fields) => {
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
  connection.query('SELECT ramo.rut_prof as rut,alumno.nom_alu,alumno.rut_alu, detalle_nota.nota, detalle_nota.numero_nota, detalle_nota.cod_ramo FROM alumno  inner join  detalle_nota on alumno.rut_alu  = detalle_nota.rut_alu  inner join ramo on ramo.cod_ramo=detalle_nota.cod_ramo Group by alumno.rut_alu', (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-rut-detallenota', function(req, res){
  connection.query('SELECT rut_alu,cod_ramo,nota,numero_nota,ponderacion FROM detalle_nota group by cod_ramo ', (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-menu-teacher', function(req, res){
  connection.query('SELECT profesor.rut_prof as rut,profesor.nom_prof, ramo.cod_ramo, ramo.nom_ramo, horario.cod_curso ,horario.dia ,horario.num_bloque,horario.sala_clases ,horario.hora  FROM profesor  inner join  ramo on profesor.rut_prof  = ramo.rut_prof  inner join horario on horario.cod_ramo=ramo.cod_ramo ',
  (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-menu-User', function(req, res){
  connection.query
  ('SELECT  curso.cod_curso, horario.num_bloque, horario.hora, horario.sala_clases ,horario.cod_ramo  FROM alumno inner join curso on alumno.cod_curso = curso.cod_curso inner join horario on horario.cod_curso = curso.cod_curso',
  (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-menu-User2', function(req, res){
  const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  connection.query
  ('SELECT  alumno.cod_curso,prueba.descripcion ,prueba.fecha, prueba.bloque, prueba.sala_clases ,prueba.cod_ramo  FROM alumno inner join prueba on alumno.cod_curso = prueba.cod_curso',
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
   app.get('/Profesor/Horario',(req,res)=> res.render('login'));

const listener = app.listen(3000, () =>
  console.log(`Running app on ${listener.address().address}${listener.address().port}`)
);
