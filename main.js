for (let i=0; i<2;i++){  
  // Objeto que almacenará la información del usuario
  const usuario = {
    nombre: "",
    clase: "",
    turno: "",
    horario: "",
  };
  
  // Array de usuarios
  const usuarios = [
    {
      nombreUsuario: "juanEjemplo",
      contraseña: "1234",
      nombre: "",
      clase: "",
      turno: "",
      horario: "",
    },
    {
      nombreUsuario: "CarlosPrueba",
      contraseña: "1234",
      nombre: "",
      clase: "",
      turno: "",
      horario: "",
    },
    
  ];
  
  // Función para iniciar el chatbot
  function iniciarChatbot() {
    alert("Hola, bienvenido. Mi nombre es DolceBot y te voy a estar guiando para que puedas sacar tu turno de entrenamiento.");
  
    const opcion = prompt("¿Qué desea hacer?\n1. Iniciar sesión\n2. Registrarse");
  
    if (opcion === "1") {
      const nombreUsuario = prompt("Ingrese su nombre de usuario:");
      const contraseña = prompt("Ingrese su contraseña:");
  
      // Verifica si las credenciales son correctas
      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.nombreUsuario === nombreUsuario && usuario.contraseña === contraseña
      );
  
      if (usuarioEncontrado) {
        alert(`Bienvenido, ${nombreUsuario}!`);
        usuario.nombre = nombreUsuario;
  
        // Continúa con el proceso de selección de clase, turno y horario
        pedirTurno();
      } else {
        alert("Credenciales incorrectas. Inténtelo de nuevo o regístrese.");
        iniciarChatbot();
      }
    } else if (opcion === "2") {
      registrarUsuario();
    } else {
      alert("Opción no válida. Por favor, seleccione 1 para iniciar sesión o 2 para registrarse.");
      iniciarChatbot();
    }
  }
  
  // Función para registrar un nuevo usuario
  function registrarUsuario() {
    const nuevoUsuario = {
      nombreUsuario: prompt("Ingrese un nombre de usuario:"),
      contraseña: prompt("Ingrese una contraseña:"),
      nombre: "",
      clase: "",
      turno: "",
      horario: "",
    };
  
    usuarios.push(nuevoUsuario);
  
    console.log("Nuevo usuario registrado:", nuevoUsuario); 
  
    alert("¡Registro exitoso! Ahora puede iniciar sesión.");
  
    iniciarChatbot();
  
  }
  
  // Función para pedir el turno del usuario
  function pedirTurno() {
    alert(`${usuario.nombre}, siga los siguientes pasos para registrar su clase!`);
    
    // Agrega lógica para seleccionar la clase, el turno y el horario aquí
    seleccionarClase();
    seleccionarTurno();
    seleccionarHorario();
    
    // Muestra la confirmación de registro
    console.log("\n¡Registro exitoso!\n" + `Nombre: ${usuario.nombre}\nClase: ${usuario.clase}\nTurno: ${usuario.turno}\nHorario: ${usuario.horario}`);
    alert("\n¡Registro exitoso!\n" + `Nombre: ${usuario.nombre}\nClase: ${usuario.clase}\nTurno: ${usuario.turno}\nHorario: ${usuario.horario}`);
  }
  
  // Iniciar el chatbot
  iniciarChatbot();
  
  // Función para seleccionar la clase
  function seleccionarClase() {
    //seleccionar clase
    const opcion = prompt("A continuación elija el número de la clase a la que quiere asistir\n 1: Open Box\n 2: Sesión Fitness\n 3: Spinning\n 4: CrossFit");
  
    switch (opcion) {
      case "1":
        usuario.clase = "Open Box";
        break;
      case "2":
        usuario.clase = "Sesión Fitness";
        break;
      case "3":
        usuario.clase = "Spinning";
        break;
      case "4":
        usuario.clase = "CrossFit";
        break;
      default:
        usuario.clase = "Clase no válida";
    }
  }
  
  // Función para seleccionar el turno
  function seleccionarTurno() {
    //Seleccion de turno
    const opcion = prompt("A continuación, escoja el turno en el que desea asistir:\n 1: Turno Mañana\n 2: Turno Tarde");
  
    switch (opcion) {
      case "1":
        usuario.turno = "Turno Mañana";
        break;
      case "2":
        usuario.turno = "Turno Tarde";
        break;
      default:
        usuario.turno = "Turno no válido";
    }
  }
  
  // Función para seleccionar el horario
  function seleccionarHorario() {
    if (usuario.turno === "Turno Mañana") {
    //seleccionar horario turno mañana
      const opcion = prompt("A continuación, elija el horario en el que desea asistir en la mañana:\n 1: 9 a 10 hs\n 2: 10 a 11 hs\n 3: 11 a 12 hs");
  
      switch (opcion) {
        case "1":
          usuario.horario = "9 a 10 hs";
          break;
        case "2":
          usuario.horario = "10 a 11 hs";
          break;
        case "3":
          usuario.horario = "11 a 12 hs";
          break;
        default:
          usuario.horario = "Horario no válido";
      }
    } else if (usuario.turno === "Turno Tarde") {
  
      const opcion = prompt("A continuación, elija el horario en el que desea asistir en la tarde:\n 1: 14 a 15 hs\n 2: 15 a 16 hs\n 3: 17 a 18 hs");
  
      switch (opcion) {
        case "1":
          usuario.horario = "14 a 15 hs";
          break;
        case "2":
          usuario.horario = "15 a 16 hs";
          break;
        case "3":
          usuario.horario = "17 a 18 hs";
          break;
        default:
          usuario.horario = "Horario no válido";
      }
    }
  }
  
  }
  
  