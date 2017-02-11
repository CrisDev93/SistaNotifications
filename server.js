var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var clients = [];

io.on('connection', function(client) {  
    
    console.log('Client conectado...');
    

    client.on('join', function(data) {
     client.join(data.id_user);
    });

    client.on('leave',function(data){
      client.leave(data.id_user);
    });

    client.on('disconnect',function(){
      console.log("Cliente desconectado ! ");
    });

    client.on('notificar_reagendar',function(data){
          console.log(data);
          io.sockets.in(data.id_user).emit('reagendar_cita',
            {'codigo' : data.codigo , 
            'cliente_nombre' : data.cliente_nombre,
            'fecha':data.fecha,
            'servicio' : data.servicio
        });
    });




  client.on('notificar_cita',function(data){
    console.log("Alguien quiere notificar a todos los que estén en el room  " + data.id_user);
    io.to(data.id_user).emit('nueva_cita','Se ha creado una nueva cita');
  });


});
server.listen(3000);