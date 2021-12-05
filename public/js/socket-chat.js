var socket = io();
// leer por parametro el nombre del usuario
var params = new URLSearchParams( window.location.search );

// Preguntar si viene el nombre
if ( !params.has('nombre') || !params.has('sala') ) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

// En este punto ya se tiene el nombre de usuario
var usuario = {
    nombre: params.get('nombre'), //que se recibe por los parametros
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    // Emitir mensaje para indicar quien se conecta
    // socket.emit('entrarChat', { usuario: 'Usuario1'  });
    // Si el server acepta entonces agregar un callback para enviar la respuesta del servidor
    socket.emit('entrarChat', usuario, function(resp){
        console.log('usuarios conectados', resp);
    } );
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información de servidor: abandono el chat
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Escucha cambios de usuarios
// Cuando un usuario entra o sale del chat
socket.on('listaPersona', function( personas) {
    console.log( personas );
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
} );