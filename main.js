let usuarios = []; // Array para almacenar usuarios

function obtenerProximoId() {
  return usuarios.length + 1;
}

// Mostrar los campos ocultos
function mostrarCampos() {
  const nuevosInput = document.getElementById('nuevosInput');
  nuevosInput.style.display = 'block'; 
}

// Función para cargar usuarios desde el localStorage
function cargarUsuariosDelLocalStorage() {
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
  if (usuariosGuardados) {
    usuarios = usuariosGuardados;
  }
}

// Llamar a la función para cargar usuarios desde el localStorage al inicio
cargarUsuariosDelLocalStorage();

function guardarUsuariosEnLocalStorage() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function recargarFormularios() {
  document.getElementById('formularioIngresar').reset();
  document.getElementById('formularioRegistrar').reset();
  document.getElementById('nuevosInput').style.display = 'none';
}

function crearNuevoUsuario() {
  const nuevoUsuario = document.getElementById('nombreUsuario').value;
  const nuevaContraseña = document.getElementById('nuevaContraseña').value;

  const nuevoUsuarioObj = {
    id: obtenerProximoId(),
    usuario: nuevoUsuario,
    contraseña: nuevaContraseña
  };

  usuarios.push(nuevoUsuarioObj);
  guardarUsuariosEnLocalStorage(); // Guardar el array en el localStorage
  swal({
    title: "¡Registro de usuario exitoso!",
    text: "Ahora puede iniciar sesión",
    icon: "success",
  });

  console.log('Nuevo usuario creado:');
  console.log(nuevoUsuarioObj);
  recargarFormularios();
}

// Función para iniciar sesión
function iniciarSesion() {
  const usuarioInput = document.getElementById('usuario').value;
  const contraseñaInput = document.getElementById('contraseña').value;

  // Obtener los usuarios del localStorage
  const usuariosFromLocalStorage = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuarioEncontrado = usuariosFromLocalStorage.find(usuario => {
    return usuario.usuario === usuarioInput && usuario.contraseña === contraseñaInput;
  });

  if (usuarioEncontrado) {
    localStorage.setItem('usuarioActual', usuarioEncontrado.usuario);
    
    swal({
      title: "¡Bienvenido a la plataforma para registrar turnos!",
      timer: 3000,
    }).then(() => {
      window.location.href = './turnos.html'; // Redirigir después de mostrar el mensaje
    });
  } else {
    swal({
      title: '¡Usuario o contraseña incorrecta!',
      icon: 'warning',
      button: 'Intentar nuevamente',
    })
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const botonIniciarSesion = document.getElementById('iniciarSesion');
  botonIniciarSesion.addEventListener('click', iniciarSesion);
});

//HTML registro_turno

function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


document.addEventListener('DOMContentLoaded', function() {
    const fechaTurnoInput = document.getElementById('fechaTurno');
    
    const hoy = new Date(); // fecha actual
    const sieteDiasDespues = new Date(hoy); // Fecha para los próximos 7 días
    sieteDiasDespues.setDate(sieteDiasDespues.getDate() + 7);

    // Formatear fechas para el campo 'date'
    const hoyFormateado = getFormattedDate(hoy);
    const sieteDiasDespuesFormateado = getFormattedDate(sieteDiasDespues);

    // atributos min y max en el campo de fecha
    fechaTurnoInput.min = hoyFormateado;
    fechaTurnoInput.max = sieteDiasDespuesFormateado;
});

document.addEventListener('DOMContentLoaded', function() {
  const seleccionTurno = document.getElementById('seleccionTurno');
  const turnoManana = document.getElementById('turnoManana');
  const turnoTarde = document.getElementById('turnoTarde');

  // Ocultar ambos campos de turno al inicio
  turnoManana.style.display = 'none';
  turnoTarde.style.display = 'none';

  // Event listener para detectar el cambio en la selección del turno
  seleccionTurno.addEventListener('change', function() {
      if (seleccionTurno.value === 'Turno Mañana') {
          turnoManana.style.display = 'block';
          turnoTarde.style.display = 'none';
      } else if (seleccionTurno.value === 'Turno Tarde') {
          turnoTarde.style.display = 'block';
          turnoManana.style.display = 'none';
      }
  });
});

//agenadar turnos en el local 
document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('formulario');
  const fechaTurnoInput = document.getElementById('fechaTurno');
  const claseInput = document.getElementById('Clase');
  const seleccionTurnoInput = document.getElementById('seleccionTurno');
  const turnoMananaInput = document.getElementById('turnoManana');
  const turnoTardeInput = document.getElementById('turnoTarde');

  
// Función para validar el formulario antes de guardar el turno
function validarFormulario() {
  return new Promise((resolve, reject) => {
    const fechaTurnoInput = document.getElementById('fechaTurno');
    const claseInput = document.getElementById('Clase');
    const seleccionTurnoInput = document.getElementById('seleccionTurno');
    const turnoMananaInput = document.getElementById('turnoManana');
    const turnoTardeInput = document.getElementById('turnoTarde');

    // Verificar si se han seleccionado correctamente todos los campos
    if (!fechaTurnoInput.value || !claseInput.value || !seleccionTurnoInput.value) {
      reject('Por favor, complete todos los campos del formulario.');
    } else if (
      (seleccionTurnoInput.value === 'Turno Mañana' && turnoMananaInput.value === '-') ||
      (seleccionTurnoInput.value === 'Turno Tarde' && turnoTardeInput.value === '-')
    ) {
      reject('Por favor, seleccione un horario disponible.');
    } else {
      resolve();
    }
  });
}


// evento 'submit' del formulario
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario
  // Verificar si no selecionó turno o clase
  if (document.getElementById('Clase').value === '-' || document.getElementById('seleccionTurno').value === '-') {
    alert('Por favor, seleccione una opción válida en Clase y Turno.');
    return; // No ejecutar el resto del código si no se seleccionó una opción válida
  }

  validarFormulario()
    .then(() => {
      // Si la validación es exitosa, continuar con el código para guardar el turno
      const usuarioActual = localStorage.getItem('usuarioActual');

      const confirmacionTurno = {
        usuario: usuarioActual,
        fecha: fechaTurnoInput.value,
        clase: claseInput.value,
        tipoTurno: seleccionTurnoInput.value,
        turno: seleccionTurnoInput.value === 'Turno Mañana' ? turnoMananaInput.value : turnoTardeInput.value
      };

      // Obtener los turnos del localStorage o inicializar un array vacío si no hay datos
      const turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];

      turnosGuardados.push(confirmacionTurno); // Agregar el turno confirmado al array de turnos

      localStorage.setItem('turnos', JSON.stringify(turnosGuardados)); // Guardar en localStorage

      // Confirmación del turno
      swal({
        title: "¡Turno registrado!",
        text: `Se ha registrado exitosamente el turno de ${usuarioActual}:\nFecha: ${confirmacionTurno.fecha}\nClase: ${confirmacionTurno.clase}\n ${confirmacionTurno.tipoTurno} : ${confirmacionTurno.turno}`,
        icon: "success",
      }).then(() => {
        //mostrarTurnosReservados();
      });
    })
    .catch((error) => {
      // Mostrar mensaje de error en caso de validación fallida
      alert('Error al guardar el turno: ' + error);
    });
});
})

document.addEventListener('DOMContentLoaded', function() {
  const usuarioVigente = document.getElementById('usuarioVigente');
  const usuario = localStorage.getItem('usuarioActual');
  usuarioVigente.textContent = usuario || 'Usuario'; // Si no hay usuario, muestra 'Usuario'
});

document.addEventListener('DOMContentLoaded', function() {
  const usuarioVigente = document.getElementById('usuarioVigente');
  const usuario = localStorage.getItem('usuarioActual');
  usuarioVigente.textContent = usuario || 'Usuario'; // Si no hay usuario, muestra 'Usuario'

  const cancelarButton = document.getElementById('reset');
  cancelarButton.addEventListener('click', function() {
      window.location.href = 'index.html'; // Redirecciona al index.html al hacer clic en el botón "Cancelar"
  });
});

// función para mostrar los turnos reservados por el usuario actual
function mostrarTurnosReservados() {
  const usuarioActual = localStorage.getItem('usuarioActual');
  const turnosContainer = document.getElementById('turnosReservadosContainer');

  // ACTUALIZAR LA FECha
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparaciones de fecha

  // Obtener los turnos del localStorage o inicializar un array vacío si no hay datos
  const turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];

  // Filtrar los turnos para el usuario actual y con fecha igual o superior a hoy
  const turnosFiltrados = turnosGuardados.filter(turno => {
    const fechaTurno = new Date(turno.fecha);
    fechaTurno.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparaciones de fecha
    return turno.usuario === usuarioActual && fechaTurno >= hoy;
  });

  if (turnosFiltrados.length > 0) {
    let mensaje = `<h3>Turnos reservados por ${usuarioActual}:</h3>`;
    turnosFiltrados.forEach(turno => {
      mensaje += `<p>Fecha: ${turno.fecha}, Clase: ${turno.clase}, Tipo de Turno: ${turno.tipoTurno}, Hora: ${turno.turno}</p>`;
    });

    // actualizar el contenido del contenedor
    turnosContainer.innerHTML = mensaje;
  } else {
    // si no hay turnos, mostrar un mensaje indicando que no hay turnos reservados
    turnosContainer.innerHTML = `<p>No hay turnos reservados para mostrar.</p>`;
  }
}

// Asociar la función a un botón en el HTML
document.addEventListener('DOMContentLoaded', function() {
  const consultarTurnosButton = document.getElementById('consultarTurnos');
  consultarTurnosButton.addEventListener('click', function(event) {
      mostrarTurnosReservados();
    });
});






