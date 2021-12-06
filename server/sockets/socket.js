const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    
    // Configurar el listener de entrarChat
    client.on('entrarChat', ( data, callback ) => {
        
        console.log( data );  

        if ( !data.nombre || !data.sala ) {
            return callback( {
                error: true,
                mensaje: 'El nombre/sala es necesario'
            } );    
        }

        client.join( data.sala );

        // Agregar persona al chat
        // let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala );
        usuarios.agregarPersona( client.id, data.nombre, data.sala );

        // Lanzar un evento que todas las personas conectadas puedan escuchar. Recuperar todas las personas conectadas al chat. Clase getPersonas
        // client.broadcast.to(data.sala).emit('listaPersona', usuarios.getTodasLasPersonas() );
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala( data.sala ) );

        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió` ) );

        // Enviar al server la persona que se acaba de agregar
        // callback(personas);
        callback( usuarios.getPersonaPorSala( data.sala ) );
        // console.log(usuario);
    }); 

    client.on('crearMensaje', (data, callback ) => {

        // obtener la persona que envia el mensaje
        let persona = usuarios.getPersonaPorId( client.id );

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        // emitir el mensaje a todos los clientes conectados
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
  
        callback(mensaje);
    });

    client.on('disconnect', () => {

        // regresa la persona borrada
        let personaBorrada = usuarios.borrarPersona( client.id);
        // Cuando la persona se va del chat o reinicia el navegador
        // client.broadcast.emit('crearMensaje', { usuario: 'Administrador', mensaje: `${personaBorrada.nombre} abandono el chat`} );
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio` ) );

        // listaPersona se dispara además 
          // Lanzar un evento que todas las personas conectadas puedan escuchar. Recuperar todas las personas conectadas al chat. Clase getPersonas
        // client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getTodasLasPersonas() );
        client.broadcast.to( personaBorrada.sala ).emit( 'listaPersona', usuarios.getPersonaPorSala( personaBorrada.sala ) );

    } );

    // Mensaje Privado
    client.on('mensajePrivado', data => {
        // la data debe tener el id de la persona que se necesita enviar 
        let persona = usuarios.getPersonaPorId( client.id );

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );
    });
});