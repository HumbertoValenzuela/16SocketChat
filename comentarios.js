// 197 Introduccion a la seccion
// 

const { Socket } = require("socket.io");

// Comunicación entre usuarios
// Comunicación entre 1 a muchos
// Comunicación 1 a 1
// Comunicación entre salas de chat
// Diseño del chat
// Diseño del login
// Notificaciones de entrada de usuarios y salida de usuarios
// El objetivo es crear una aplicación de chat completa

// 199 Inicio del proyecto - Socket Chat
// npm install
// Actualizar librerías con problemas
// npm update socket.io

// 200 Clase para controlar los usuarios del chat
// En los socket.io client tiene un id
// { id: 'aksjjffui3ui34h', nombre: 'Juan', sala: 'general' }
// usuarios.js clase usuarios. contructor array personas []
// método agregarPersona que crea una persona la agrega al array y retorna todo el array de personas
// Borrar persona del Array de personas. Sirve para cuando alguien sale del chat

// 201 Front-End Conectar un usuario
// frontend Emitir entrarChat mensaje para indicar quien se conecta
// server recibir Configurar el listener de entrarChat
// socket-chat leer por parametro el nombre del usuario
// leer por parametro el nombre del usuario
// Preguntar si viene el nombre
// navegador web - probar recargando la pagina se redireccion al index.html
// http://localhost:3000/chat.html?nombre=Humberto
// En la terminal { nombre: 'Humberto' }
// Si el server acepta entonces agregar un callback para enviar la respuesta del servidor
// Para que funciona el callback del servidor. En el frontend se agrega el método agregarPersona en socket.js. Validar si !data.nombre { error }
//  // Agregar persona al chat
// Enviar al server la persona que se acaba de agregar
// Navegador 0: {id: 'n2qdQ802sHAKXe-5AAAB', nombre: 'Guillermo'}
// Navegador 1: {id: 'n2qdQ802sHAKXe-5AAAB', nombre: 'Juan'}
// cada vez que se actualiza la página se crea otro registro, esto no debe suceder debido a que el usuario ya existe. Cuando se desconecta o reinicia el navegador, debería borrar el registro

// 202 Desconectar usuarios
// cada vez que se actualiza la página se crea otro registro, esto no debe suceder debido a que el usuario ya existe. Cuando se desconecta o reinicia el navegador, debería borrar el registro
// socket.js: client.on('disconnect', () => { se ejecutará una limpieza
// Luego usar el método eliminarPersona. Que regresa la persona borrada
// con esto se elimina la duplicidad de usuarios
// Cuando la persona se va del chat o reinicia el navegador. Informar que se desconecta a todos los usuarios
// client.broadcast.emit('crearMensaje', avisando que salio del chat
// socket-chat.js se necesita que los clientes esten escuchando el evento crearMensaje
// socket.on('crearMensaje', function(mensaje) {
// Con esto en la consola se ve el mensaje del servidor que un usuario abandono el chat
// Crear mensaje que un usuario ingreso al chat
// socket.js: connection - entrarChar - // Lanzar un evento que todas las personas conectadas puedan escuchar. Recuperar todas las personas conectadas al chat. Clase getTodasLasPersonas
// client.broadcast.emit('listaPersona', usuarios.getTodasLasPersonas() );
// Este evento se debe ejecutar tambien en disconnect
// socket-chat.js: crear el evnto listaPersona del lado del cliente.// Escucha cambios de usuarios
// Cuando un usuario entra o sale del chat
// socket.on('listaPersona', function( personas) {
// Probar en navegador web. dos pantallas 
// http://localhost:3000/chat.html?nombre=Guillermo
// http://localhost:3000/chat.html?nombre=Humberto
// Al recargar en guillermo, el otro navegador informa que abandono el chat. Luego actualiza la lista y dice que solo yo esta conectado. Luego como el navegador cargo vuelve a conectar guillermo aparece otra lista de usuarios mostrando un arreglo de dos usuarios conectados

// 203 Enviando un mensaje a todo el grupo
// crearMensaje será encargado de un cliente emitir a los demás usuarios 
// crear utilidades que tengo nombre, mensaje, fecha
// importar en socket.js - disconnect -  client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio` ) );
// Resultado: Servidor: {nombre: 'Administrador', mensaje: 'yo salio', fecha: 1638563303332}
// Un cliente manda un mensaje, las otras personas reciben el mensaje
// socket.chat.js: se tiene a socket.on  crearMensaje para escuchar
// socket.js: Se necesita que el servidor este escuchando, cuando algún usuario llama a ese método de crearMensaje. Entonces se recibe la data y crear un nuevo mensaje
// en el navegador - consola - emitir un mensaje
// socket.emit('crearMensaje', { nombre:'A todos', mensaje: 'otra ventana'});
// utilizando el utilidades crearMensaje
// obtener el usuario correcto 
// let persona = usuarios.getPersonaPorId( client.id );
// obtener la persona que envia el mensaje
// let mensaje = crearMensaje( persona.nombre, data.mensaje );
// Con esto aunque se envie por parametro un usuario cualquiera, este nos dará el usuario por el client.id
// Entonces en el navegador - consola - socket.emit('crearMensaje', { mensaje: 'otra ventana'});
// Dará como resultado: Servidor: {nombre: 'Guillermo', mensaje: 'otra ventana', fecha: 1638566441549}

// 204 Enviar un mensaje a un usuario en especifico
// socket-chat.js: socket.on('mensajePrivado', function(mensaje) {
// en la parte del servidor se debe estar escuchando cuando se emitan esos mensajes privados.
// socket.js: client.on('mensajePrivado')
// obtener la persona.id
// enviar a todos mediante broadcast
// Navegador - consola - actualizar - socket.emit('mensajePrivado', {mensaje: 'otra ventana'});
// Todos reciben el mensajePrivado
// Recargar una pantalla para saber el id de juan por ejemplo KgL-aZKToY5rdM4lAAAH
// El id se debe enviar hacia el servidor y enviar a un usuario en especifico
// client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );
// navegador - console - actualizar las 3 ventanas - obtener el id de juan - ojo no volver a recargar porque cambiaran los ids
//  socket.emit('mensajePrivado', {mensaje: 'otra ventana', para:'SHPFQ3jbUGKP0Q2bAAAF'})
// con esto se envia el mensaje a un usuario en especifico

// 205 Salas de Chat
// todo el mundo que tenga ese id recibirá el mensaje
// client.broadcast.to(data.para). Pero como es único lo recibe uno.
// Las Salas de Chat tiene el mismo concepto
// Socket-chat.js verificar recibir por parametro el nombre o la sala
// if ( !params.has('nombre') || !params.has('sala') )
// si uno de los dos no esta en la url, se debe enviar un error
// Notificar solo a los usuarios de la misma sala
// Agregar en el objeto usuario la sala
// socket.js: agregar validación   if ( !data.nombre || !data.sala ) {
// client.join( data.sala ); join es un evento que se ejecuta cuando un usuario se une a una sala. data.sala se obtiene desde el navegador - input - params
//  let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala );
// usuarios.js: clase - método - agregarPersona( id, nombre, sala ) {

// 206 Mensajes y notificaciones a las salas de chat
// en estos momentos cuando se recarga el navegador aún todos reciben que el usuario se conecto.
// socket.js: Debido a que client.on('entrarChat', ( data, callback ) tiene un  client.broadcast.emit('listaPersona' , es decir, envia a todos los usuarios sin importar la sala. 
// Entonces cambiar a  client.broadcast.to(data.sala).emit('listaPersona',
// Ahora debe recibir solo conectados en el chat de sala
// Al probar en el navegador - 3 ventanas - Dos salas Juegos y 1 sala Otrasala
// al actualizar OtraSala, los otros dos indica dos usuarios en la sala. sala OtraSala indica entre dos y 3 usuarios. Esta malo, corrigiendo.
// client.on('crearMensaje' hacer un broadcast pero solo a las personas que se encuentran en la misma sala
// client.broadcast.to(persona.sala)
// Revisar let persona = usuarios.getPersonaPorId( client.id ); esta correcto.
// Al disconnect enviar una notificación pero unicamente a los usuarios que se encuentren en la misma sala
// client.on('disconnect', () => {
// client.broadcast.to(personaBorrada.sala).emit('crearMensaje',
// client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getTodasLasPersonas() );
// getTodasLasPersonas esta con problemas. porque muestra todos. se necesita mostrar todos x sala.
// usuarios.js: crear otro método getPersonasPorSala( sala ) {
  // client.broadcast.to( personaBorrada.sala ).emit( 'listaPersona', usuarios.getPersonaPorSala( personaBorrada.sala ) );
// cambiar client.on('entrarChat', ( data, callback )
// client.broadcast.to(data.sala).emit('listaPersona', usuarios.getTodasLasPersonas() );
// por  client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala() );

// 207 Respaldo a GitHub de nuestra aplicacion de Chat
// GitHub - Crear un repositorio
// 16SocketChat

// 208 Diseno de nuestra sala de chat
// Copiar y pegar archivos a public

// 209 Renderizar usuarios
// renderizarUsuarios usar en socket-chat.js
// socket.on('connect'
// socket.emit('entrarChat',  renderizarUsuarios( resp );
// Navegador - dos ventanas - notar que el segundo usuario conectado obtiene los anteriores. Pero los antiguos usuarios en la sala, no actualiza para obtener los nuevos conectados.
// socket-chat.js: listaPersona, se dispara cuando hay cambios en las personas. Cuando entra, sale.
// socket.on('listaPersona', function( personas) {
//   // console.log( personas );
//   renderizarUsuarios( personas );
// });


// 210 Obtener el ID del usuario conectado
// Al hacer clic en el nombre de usuario, se debe enviar el id del usuario a la consola
// Listeners
// socket-chat-jquery.js:
// divUsuarios.on('click', 'a', function() {
//   var id = $(this).data('id');
//   if (id) {
//       console.log(id);
//   }
// });

// 211 Enviar y renderizar mensajes
// Enviar mensajes usando el DOM
// chat.html: <form id="formEnviar">
//* <div class="row">
{/* <div class="col-8">
    <input autocomplete="off" id="txtMensaje" placeholder="Escribe tu mensaje aquí" class="form-control b-0" autofocus>
</div>
<div class="col-4 text-right">
    <button type="submit" class="btn btn-info btn-circle btn-lg"><i class="fa fa-paper-plane-o"></i> </button>
</div>
</div>
</form>  */}
// socket-chat-jquery.js:
// var formEnviar = $('#formEnviar');
// var txtMensaje = $('#txtMensaje');
// Obtener info de la caja de texto
// usarlo en la función formEnviar.on('submit
// Al Enviar mensaje - borrar el texto
// Obtener de params nombre. mensaje obtener de txtMensaje.val()
// Se observa que puedes ver los mensajes enviados por la consola
// Cuando aplicación carga foco en el Input y auto-completa off
//{/* <input autocomplete="off" id="txtMensaje" placeholder="Escribe tu mensaje aquí" class="form-control b-0" autofocus> */}
// Cuando se envie el mensaje, el server notificar para borrar la casilla de texto
// Socket.js: crearMensaje callback(mensaje); para regresar el mensaje
// Renderizar en la pantalla de chat
// socket-chat-jquery.js: referencia divChatbox
// function renderizarMensajes. mensaje tiene fecha mensaje nombre
// Mensaje en azul es de otros.
// Mensaje en gris es mio. 
// formEnviar.on('submit' llamar la funcion renderizarMensajes
// Usar renderizarMensajes cuando se recibe un mensaje
// socket-chat.js:
// socket.on('crearMensaje', function(mensaje) {
// console.log('Servidor:', mensaje);
// renderizarMensajes(mensaje, false);

// 212 Mejorar la forma de renderizar mensajes
// Renderizacion entre ambos mensajes
// socket-chat-jquery.js:renderizarMensajes: si (yo) lo envia evaluar la condicion
// obtener hora var hora = fecha.getHours() + ':' + fecha.getMinutes();
// Si soy yo entonces colocar mensaje del lado derecho y si no, el lado izquierdo.
// formEnviar.on('submit
//  renderizarMensajes(mensaje, true); la bandera
// socket-chat.js: socket.on('crearMensaje', function(mensaje) {
    // console.log('Servidor:', mensaje);
    // renderizarMensajes(mensaje, false);
  // }); notar la bandera
  // socket-chat-jquery.js: cuando es administrador cambiar el color a rojo
  // function renderizarMensajes(mensaje, yo) {
    // if (mensaje.nombre === 'Administrador') { adminClass = 'danger';
    // if (mensaje.nombre !== 'Administrador') {
// Cuando un usuario entra al chat, enviar mensaje usuario entro
// socket.js: entrarChat client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió` ) );
// scrollBottom: Cada vez que alguien escribe se va el scroll al final
// socket-chat-jquery.js: formEnviar  scrollBottom();
// socket-chat.js: socket.on('crearMensaje', function(mensaje) {  scrollBottom();

// 213 Propuestas para ejercicios del chat
// Buscar Contactos.
// Cambiar el titulo de sala de chat.
// Cambiar la imagen de perfil.
// clic en un usuario y abrir otra ventana de chat.

// 214 Subir cambios a GitHub – SocketChat
