//importamos los paquetes express y mysql para las consultas
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

//Establecemos todos los parametros para nuestra conexion con la BD
var conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbclub',
    port: '33085'
});
//probamos la conexion
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Conexion a la BD exitosa");
    }
})


app.get('/', function(req,res){
    res.send('Ruta INICIO');
});

//mostrar todos los registros
app.get('/api/master_club',(req,res)=>{
    conexion.query('SELECT * FROM master_club',(error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

//mostrar SOLO  articulos
app.get('/api/master_club/:id',(req,res)=>{
    conexion.query('SELECT * FROM master_club WHERE idmaster = ?',[req.params.id], (error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});

//insertar registros
app.post('/api/master_club',(req,res)=>{
    let data = {fechaReserva:req.body.fechaReserva, numInvitados:req.body.numInvitados, 
                tipoEvento:req.body.tipoEvento, costo:req.body.costo, 
                comentarios:req.body.comentarios, status:req.body.status};
    let sql = "INSERT INTO master_club SET ?";                
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//editar registro
app.put('/api/master_club/:id',(req,res)=>{
    let idmaster = req.params.id;
    let fechaReserva = req.body.fechaReserva;
    let numInvitados = req.body.numInvitados; 
    let tipoEvento = req.body.tipoEvento;
    let costo = req.body.costo;
    let comentarios = req.body.comentarios;
    let status = req.body.status;
    let sql = "UPDATE master_club SET fechaReserva=?, numInvitados = ?, tipoEvento = ?, costo = ?, comentarios = ?, status = ? WHERE idmaster = ?";

    conexion.query(sql, [fechaReserva, numInvitados, tipoEvento, costo, comentarios, status, idmaster]  , function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
});

//metodo para elimnar registro
app.delete('/api/master_club/:id',(req,res)=>{
    conexion.query('DELETE FROM master_club WHERE idmaster = ?',[req.params.id], function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});


const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function(){
    console.log("Servidor Ok en puerto: "+puerto);
})