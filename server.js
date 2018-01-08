
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
app.post('/data-insert-ramo', function(req, res){
  const data = req.body;
  const {rut, name, ramo, curso} = req.body;
  const query = `insert into ramo(cod_ramo, rut_prof, nom_ramo, cod_curso) values('${ramo}', '${rut}', '${name}', '${curso}')`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
app.post('/data-insert-evento', function(req, res){
  const data = req.body;
  const {rut, newfecha, hora, descripcion} = req.body;
  const query = `insert into eventos(rut_alu, fecha, hora, descripcion) values('${rut}', '${newfecha}', '${hora}', '${descripcion}')`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
app.post('/data-insert-quest', function(req, res){
  const data = req.body;
  const {codRamo,curso, rut, newfecha, hora,sala, descripcion} = req.body;
  const query = `insert into prueba(cod_ramo,cod_curso,rut_prof, fecha, hora,sala_clases, descripcion) values('${codRamo}','${curso}','${rut}', '${newfecha}', '${hora}', '${sala}','${descripcion}')`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
app.post('/data-insert-Horario', function(req, res){
  const data = req.body;
  const {codCurso, dia, bloque, sala, hora, codRamo} = req.body;
  const query = `insert into horario(cod_curso, dia, num_bloque, sala_clases, hora, cod_ramo) values('${codCurso}', '${dia}', '${bloque}', '${sala}','${hora}','${codRamo}')`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});

app.post('/data-insert-Nota', function(req, res){
  const data = req.body;
  const { rut ,ramo,numeroNota,año,semestre,Ponderacion,Nota} = req.body;
  const query = `insert into detalle_nota(cod_ramo,rut_alu, numero_nota, año, semestre,ponderacion,nota) values('${ramo}','${rut}', '${numeroNota}', '${año}', '${semestre}', '${Ponderacion}', '${Nota}')`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
app.post('/data-insert-curso', function(req, res){
  const data = req.body;
  const {cod_curso,carrera} = req.body;
  const query = `insert into curso(cod_curso,carrera) values('${cod_curso}', '${carrera}')`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
///////////////////////////////////////
app.post('/data-update-curso', function(req, res){
  const data = req.body;
  console.log(data);
  const { cod_curso, carrera} = req.body;
  const query = `update  curso set  carrera= '${carrera}' where cod_curso= '${cod_curso}'`;
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
app.post('/data-update-user-password', function(req, res){
  const data = req.body;
  const { rut ,pw} = req.body;
  const query = `update  alumno set  contraseña = '${pw}'  where rut_alu= '${rut}'`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
app.post('/data-update-teacher-password', function(req, res){
  const data = req.body;
  const { rut ,pw} = req.body;
  const query = `update  profesor set  contraseña = '${pw}'  where rut_prof= '${rut}'`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
app.post('/data-update-admin-password', function(req, res){
  const data = req.body;
  const { rut ,pw} = req.body;
  const query = `update  administrador set  contraseña = '${pw}'  where rut_admin= '${rut}'`;
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
app.post('/data-update-ramo', function(req, res){
  const data = req.body;
  console.log(data);
  const { rut,name,ramo ,curso} = req.body;
  const query = `update  ramo set rut_prof= '${rut}', nom_ramo =  '${name}', cod_curso = '${curso}' where cod_ramo= '${ramo}'`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});

app.post('/data-update-horario', function(req, res){
  const data = req.body;
  console.log(data);
  const { cod_curso, dia, bloque, sala_clases,hora,cod_ramo} = req.body;
  const query = `update  horario set  dia= '${dia}', num_bloque =  '${bloque}', sala_clases = '${sala_clases}', hora = '${hora}', cod_ramo = '${cod_ramo}' where cod_curso= '${cod_curso}' and dia= '${dia}' and num_bloque= '${bloque}' and sala_clases= '${sala_clases}' and hora= '${hora}' `;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
});
//////////
app.post('/data-delete-curso', function(req, res){
  const data = req.body;
  console.log(data);
  const { cod_curso, carrera} = req.body;
       const query = `delete from curso where cod_curso= '${cod_curso}'`;
connection.query(query, (error, results, fields) => {
     console.error(error);
  });
  console.error("eliminado....");
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
app.post('/data-delete-ramo', function(req, res){
  const data = req.body;
  const codRamo = data.cod_ramo;
  const query = `delete from ramo where cod_ramo= '${codRamo}'`;
  connection.query(query, (error, results, fields) => {
      console.error(error);
  });
  console.error("eliminado....");
});
  app.post('/data-delete-horario', function(req, res){
     const data = req.body;
     console.log(data);
     const { cod_curso, dia, num_bloque, sala_clases, hora,cod_ramo} = req.body;
          const query = `delete from horario where cod_curso= '${cod_curso}' and dia= '${dia}' and num_bloque= '${num_bloque}' and sala_clases= '${sala_clases}'and hora= '${hora}'`;
  connection.query(query, (error, results, fields) => {
        console.error(error);
     });
     console.error("eliminado....");
   });

   app.post('/data-delete-event', function(req, res){
    const data = req.body;
    console.log(data);
    const { rut_alu, fecha, hora, descripcion} = req.body;
         const query = `delete from eventos where rut_alu= '${rut_alu}' and fecha= '${fecha}' and hora= '${hora}'`;
 connection.query(query, (error, results, fields) => {
       console.error(error);
    });
    console.error("eliminado....");
  });
  app.post('/data-delete-quest', function(req, res){
    const data = req.body;
    console.log(data);
    const { rut,fecha,hora,descripcion,sala_clases,nom_ramo,cod_ramo,cod_curso} = req.body;
         const query = `delete from prueba where cod_ramo= '${cod_ramo}' and cod_curso= '${cod_curso}' and rut_prof= '${rut}'and fecha= '${fecha}'`;
 connection.query(query, (error, results, fields) => {
       console.error(error);
    });
    console.error("eliminado....");
  });
  app.post('/data-delete-detalleNota', function(req, res){
    const data = req.body;
    console.log( req.body);
    const { cod_ramo,nota,numero_nota, ponderacion,rut_alu} = data;
    console.log (rut_alu, cod_ramo, numero_nota);
         const query = `delete from detalle_nota where cod_ramo= '${cod_ramo}' and rut_alu= '${rut_alu}' and numero_nota= '${numero_nota}'`;
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
  connection.query('SELECT rut_alu,cod_ramo,nota,numero_nota,ponderacion FROM detalle_nota order by cod_ramo ', (error, results, fields) => {
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
  ('SELECT  curso.cod_curso, horario.num_bloque, horario.hora, horario.sala_clases ,horario.cod_ramo,horario.dia  FROM alumno inner join curso on alumno.cod_curso = curso.cod_curso inner join horario on horario.cod_curso = curso.cod_curso  GROUP BY horario.cod_ramo',
  (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-menu-User2', function(req, res){
  const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  connection.query
  ('SELECT  alumno.cod_curso,prueba.descripcion ,prueba.fecha, prueba.bloque, prueba.sala_clases ,prueba.cod_ramo  FROM alumno inner join prueba on alumno.cod_curso = prueba.cod_curso group by descripcion',
  (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-menu-teacher2', function(req, res){
  connection.query
  ('SELECT profesor.rut_prof as rut, prueba.fecha, prueba.hora, prueba.descripcion,prueba.sala_clases ,ramo.nom_ramo,ramo.cod_ramo ,prueba.cod_curso FROM profesor inner join ramo on profesor.rut_prof = ramo.rut_prof inner join prueba on prueba.rut_prof= ramo.rut_prof AND prueba.cod_ramo = ramo.cod_ramo',
  (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-ramos-user', function(req, res){
  connection.query
  ('SELECT alumno.rut_alu as rut, alumno.cod_curso, ramo.nom_ramo, ramo.cod_ramo, profesor.nom_prof, profesor.email, profesor.telefono FROM alumno inner join ramo on alumno.cod_curso = ramo.cod_curso inner join profesor on profesor.rut_prof= ramo.rut_prof',
  (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-ramos-teacher', function(req, res){
  connection.query
  ('SELECT ramo.rut_prof,ramo.nom_ramo, ramo.cod_ramo, horario.dia, horario.num_bloque, horario.hora FROM ramo inner join horario on ramo.cod_ramo = horario.cod_ramo',
  (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-quest', function(req, res){
  connection.query('SELECT * FROM prueba', (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-event', function(req, res){
  connection.query('SELECT * FROM eventos', (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-notas', function(req, res){
  connection.query('SELECT * FROM nota', (error, results, fields) => {
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
