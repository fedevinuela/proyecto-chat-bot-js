let usuarios = []; // Array para almacenar usuarios

function obtenerProximoId() {
  return usuarios.length + 1;
}

function mostrarCampos() {
  const nuevosInput = document.getElementById('nuevosInput');
  nuevosInput.style.display = 'block'; // Mostrar los campos ocultos
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

  alert('¡Registro de usuario exitoso! Ahora puede iniciar sesión');
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
    window.location.href = './turnos.html';
    alert('¡Bienvenido!');

  } else {
      alert('Usuario o contraseña incorrectos');
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
    
    const hoy = new Date(); // Fecha actual
    const sieteDiasDespues = new Date(hoy); // Fecha para los próximos 7 días
    sieteDiasDespues.setDate(sieteDiasDespues.getDate() + 7);

    // Formatear fechas para el campo 'date'
    const hoyFormateado = getFormattedDate(hoy);
    const sieteDiasDespuesFormateado = getFormattedDate(sieteDiasDespues);

    // Establecer los atributos min y max en el campo de fecha
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

  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

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
    alert(`Se ha registrado exitosamente el turno de ${usuarioActual}:\nFecha: ${confirmacionTurno.fecha}\nClase: ${confirmacionTurno.clase}\n ${confirmacionTurno.tipoTurno} : ${confirmacionTurno.turno}`);
    window.location.reload();
  });
});

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
