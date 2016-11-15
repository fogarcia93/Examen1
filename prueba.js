//Espress - Backend
var express = require('express')
var app = express()
app.use(express.static('public'))

//Ejs - Frontend
app.set('view engine', 'ejs')

//Sqlite3 - BDD
var sqlite3 = require('sqlite3').verbose()

app.get('/eliminar', function(req, res) {

  var db = new sqlite3.Database("bdd.sqlite3")
  db.serialize(function() {

    var stmt = db.prepare("DELETE FROM personas where nombre =? and apellido =? and correo =? and telefono =?")
    stmt.run(req.query.nombre,req.query.apellido,req.query.correo,req.query.telefono)
    stmt.finalize()

    var personas = []
    db.all("select * from personas;", function(err, rows)
    {  
      rows.forEach(function (row) {  
        personas.push([row.nombre, row.apellido, row.correo, row.telefono])
      })
      res.render('index', { personas: personas })
    });

  });
  db.close();
})

app.get('/guardar', function(req, res) {

  var db = new sqlite3.Database("bdd.sqlite3")
  db.serialize(function() {

    var stmt = db.prepare("INSERT INTO personas VALUES (?,?,?,?)")
    stmt.run(req.query.nombre,req.query.apellido,req.query.correo,req.query.telefono)
    stmt.finalize()

    var personas = []
    db.all("select * from personas;", function(err, rows)
    {  
      rows.forEach(function (row) {  
        personas.push([row.nombre, row.apellido, row.correo, row.telefono])
      })
      res.render('index', { personas: personas })
    });

  });
  db.close();
})

app.get('/editar', function(req, res) {

  var db = new sqlite3.Database("bdd.sqlite3")
  db.serialize(function() {

    var stmt = db.prepare("UPDATE personas SET telefono= ? ,correo= ?,  apellido= ? WHERE nombre=?")
    stmt.run(req.query.telefono,req.query.correo,req.query.apellido,req.query.nombre)
    stmt.finalize()

    var personas = []
    db.all("select * from personas;", function(err, rows)
    {  
      rows.forEach(function (row) {  
        personas.push([row.nombre, row.apellido, row.correo, row.telefono])
      })
      res.render('index', { personas: personas })
    });

  });
  db.close();
})





app.get('/', function(req, res) {

  var personas = []

  var db = new sqlite3.Database("bdd.sqlite3")
  db.all("select * from personas;", function(err, rows)
  {  
    rows.forEach(function (row) {  
      personas.push([row.nombre,row.apellido,row.correo,row.telefono])
    })
    res.render('index', { personas: personas })
  });
  db.close();

});
  
app.listen(8000)
