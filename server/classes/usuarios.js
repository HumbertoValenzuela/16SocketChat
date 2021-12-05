// { id: 'aksjjffui3ui34h', nombre: 'Juan', sala: 'general' }

class Usuarios {

  constructor() {
    // Array de personas conectadas al chat
    this.personas = [];

  }

  agregarPersona( id, nombre, sala ) {
    let persona = { id, nombre, sala };
    this.personas.push( persona );

    return this.personas //todas las personas
  }

  // Obtener persona por id
  getPersonaPorId( id) {
    // Buscar la persona
    let persona = this.personas.filter( pers => pers.id == id)[0];
    // Si no encuentra la persona es undefined
    return persona;
  }

  // Obtener todas las personas
  getTodasLasPersonas() {
    return this.personas;
  }

  getPersonaPorSala( sala ) {
    let personasEnSala = this.personas.filter( persona => persona.sala === sala );
    return personasEnSala;
  }

  // Borrar persona del Array de personas
  borrarPersona( id) {

    // Para no perder el id
    let personaBorrada = this.getPersonaPorId( id );
    this.personas = this.personas.filter( persona => persona.id !== id);

    return personaBorrada;
  }
}

module.exports = {
  Usuarios
}