for (let i=0; i<2;i++){  
    // Objeto que almacenará la información del usuario
  const usuario = {
    nombre: "",
    clase: "",
    turno: "",
    horario: "",
  };

  // Función para iniciar el chatbot
  function iniciarChatbot() {
    alert("Hola, bienvenido. Mi nombre es DolceBot y te voy a estar guiando para que puedas sacar tu turno de entrenamiento.");

    // Pide al usuario su nombre
    pedirNombre();
  }

  // Función para pedir el nombre del usuario
  function pedirNombre() {
    const nombre = prompt("Por favor, ingrese su nombre de usuario:");
    usuario.nombre = nombre;

    // Pide al usuario que seleccione la clase
    alert(`Hola, ${nombre}. A continuación elija el número de la clase a la que quiere asistir`);

    const claseSeleccionada = prompt("1: Open Box,    2: Sesion Fitnes,    3: Spining,    4: CrosFit");
    usuario.clase = obtenerClasePorNumero(claseSeleccionada);

    // Pide al usuario que seleccione el turno
    alert("A continuación por favor, escoja el turno en el que desea asistir");
    const turnoSeleccionado = prompt("1. Turno Mañana,    2. Turno Tarde");
    usuario.turno = obtenerTurnoPorNumero(turnoSeleccionado);

    // Pide al usuario que seleccione el horario
    if (turnoSeleccionado == "1") {
      alert("A continuación por favor, elija el horario en el que desea asistir");
      const horarioTurnoManana = prompt("1. de 9 a 10,    2. de 10 a 11,    3. de 11 a 12");
      usuario.horario = obtenerHorarioTm(horarioTurnoManana);
      
    } else if (turnoSeleccionado == "2") {
      alert("A continuación por favor, elija el horario en el que desea asistir");
      const horarioTurnoTarde = prompt("1. de 14 a 15,    2. de 15 a 16,    3. de 17 a 18");
      usuario.horario = obtenerHorarioTt(horarioTurnoTarde);
    }

    // Muestra la confirmación de registro
    console.log ("\n¡Registro exitoso!\n" + `Nombre: ${usuario.nombre}\nClase: ${usuario.clase}\nTurno: ${usuario.turno}\nHorario: ${usuario.horario}`);
    
    alert("\n¡Registro exitoso!\n" + `Nombre: ${usuario.nombre}\nClase: ${usuario.clase}\nTurno: ${usuario.turno}\nHorario: ${usuario.horario}`);
  }


  // Funciones de utilidad para obtener opciones por número
  function obtenerClasePorNumero(numero) {
    switch (numero) {
      case "1":
        return "Open Box";
      case "2":
        return "Sesion Fitnes";
      case "3":
        return "Spining";
      case "4":
        return "Cros Fit";
      default:
        return "Clase no válida";
    }
  }

  function obtenerTurnoPorNumero(numero) {
    switch (numero) {
      case "1":
        return "Turno Mañana";
      case "2":
        return "Turno Tarde";
      default:
        return "Turno no válido";
    }
  }

  function obtenerHorarioTm(numero) {
    switch (numero) {
      case "1":
        return "9 a 10 hs";
      case "2":
        return "10 a 11 hs";
      case "3":
        return "11 a 12 hs";
      default:
        return "Horario no válido";
    }
  }

  function obtenerHorarioTt(numero) {
    switch (numero) {
      case "1":
        return "14 a 15 hs";
      case "2":
        return "15 a 16 hs";
      case "3":
        return "17 a 18 hs";
      default:
        return "Horario no válido";
    }
  }

  // Iniciar el chatbot
  iniciarChatbot();

}
