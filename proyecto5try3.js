// Crear una nueva instancia de juego Phaser
var juego = new Phaser.Game(500, 450, Phaser.CANVAS, 'game', {
  preload: preload,
  create: create,
  update: update
});

// Declarar variables para el personaje, la esfera, las teclas, la red neuronal, los datos de entrenamiento, el estado de entrenamiento, el modo de juego, el texto del modo y el botón de reinicio
var personaje, esfera;
var teclas = {};
var redNeuronal, datosEntrenamiento = [];
var entrenamientoCompleto = false;
var modoAutomático = false;
var botonReiniciar;
var trainingDataCount = 0;
var startTime, survivalTime;

// Elementos del DOM para los contadores
var gameModeElement = document.getElementById('game-mode');
var trainingDataElement = document.getElementById('data-points');
var survivalTimeElement = document.getElementById('survival-time');

// Función para precargar los recursos del juego
function preload() {
  // Cargar las imágenes y sprites del juego
  juego.load.image('fondo', 'assets/game/fondo2.png');
  juego.load.spritesheet('personaje', 'assets/sprites/axo.png', 32, 48);
  juego.load.image('esfera', 'assets/sprites/purple_ball.png');
  juego.load.image('boton', 'assets/sprites/altair2.png');
}

// Función para crear los objetos del juego
function create() {
  console.log("Crear el juego");

  // Añadir un fondo al juego
  juego.add.tileSprite(0, 0, 500, 450, 'fondo');

  // Crear y configurar el personaje
  personaje = juego.add.sprite(juego.world.centerX, juego.world.centerY, 'personaje');
  juego.physics.arcade.enable(personaje);
  personaje.body.collideWorldBounds = true;

  // Crear y configurar la esfera
  esfera = juego.add.sprite(juego.world.randomX, juego.world.randomY, 'esfera');
  juego.physics.arcade.enable(esfera);
  esfera.body.collideWorldBounds = true;
  esfera.body.bounce.set(1); // Hacer que la esfera rebote
  esfera.body.velocity.set(300, 300); // Asignar una velocidad inicial a la esfera

  // Configurar las teclas de control
  teclas.W = juego.input.keyboard.addKey(Phaser.Keyboard.W);
  teclas.A = juego.input.keyboard.addKey(Phaser.Keyboard.A);
  teclas.S = juego.input.keyboard.addKey(Phaser.Keyboard.S);
  teclas.D = juego.input.keyboard.addKey(Phaser.Keyboard.D);
  juego.input.keyboard.addKeyCapture([Phaser.Keyboard.W, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR]);

  // Inicializar el tiempo de inicio
  startTime = juego.time.now;

  // Actualizar el modo de juego en el HTML
  gameModeElement.textContent = 'Manual';

  // Crear una nueva red neuronal
  redNeuronal = new synaptic.Architect.Perceptron(4, 10, 2);
  if (!redNeuronal) {
    console.error("Error al crear la red neuronal");
  }
}

// Función para actualizar el estado del juego
function update() {
  // Si el juego está en modo manual, controlar el personaje con las teclas
  if (!modoAutomático) {
    personaje.body.velocity.x = 0;
    personaje.body.velocity.y = 0;

    if (teclas.A.isDown) {
      personaje.body.velocity.x = -300;
    } else if (teclas.D.isDown) {
      personaje.body.velocity.x = 300;
    }

    if (teclas.W.isDown) {
      personaje.body.velocity.y = -300;
    } else if (teclas.S.isDown) {
      personaje.body.velocity.y = 300;
    }
  }

  // Cambiar el modo de juego al presionar la barra espaciadora
  if (juego.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    modoAutomático = !modoAutomático;
    gameModeElement.textContent = modoAutomático ? 'Automático' : 'Manual';
    if (modoAutomático) {
      console.log('Modo automático activado');
      if (!entrenamientoCompleto) {
        entrenarRedNeuronal();
      }
    } else {
      console.log('Modo manual activado');
    }
  }

  // Si el juego está en modo automático y el entrenamiento está completo, controlar el personaje con la red neuronal
  if (modoAutomático && entrenamientoCompleto) {
    var salidaRed = redNeuronal.activate(obtenerEntradas());
    var velocidadX = (salidaRed[0] * 2 - 1) * 300;
    var velocidadY = (salidaRed[1] * 2 - 1) * 300;
    velocidadX = Phaser.Math.clamp(velocidadX, -300, 300);
    velocidadY = Phaser.Math.clamp(velocidadY, -300, 300);
    personaje.body.velocity.x = velocidadX;
    personaje.body.velocity.y = velocidadY;
  } else {
    registrarMovimiento();
  }

  // Detectar colisiones entre el personaje y la esfera
  juego.physics.arcade.collide(personaje, esfera, finJuego, null, this);

  // Actualizar el tiempo de supervivencia
  survivalTime = (juego.time.now - startTime) / 1000;
  survivalTimeElement.textContent = survivalTime.toFixed(2) + 's';
}

// Función para obtener las entradas para la red neuronal
function obtenerEntradas() {
  return [
    personaje.x / juego.width,
    personaje.y / juego.height,
    esfera.x / juego.width,
    esfera.y / juego.height
  ];
}

// Función para registrar los movimientos del personaje
function registrarMovimiento() {
  var entrada = obtenerEntradas();
  var salida = [0.5, 0.5];

  if (teclas.A.isDown) {
    salida[0] = 0;
  } else if (teclas.D.isDown) {
    salida[0] = 1;
  }

  if (teclas.W.isDown) {
    salida[1] = 0;
  } else if (teclas.S.isDown) {
    salida[1] = 1;
  }

  // Guardar las entradas y salidas en los datos de entrenamiento
  datosEntrenamiento.push({ input: entrada, output: salida });
  console.log(datosEntrenamiento);
  trainingDataCount++;
  trainingDataElement.textContent = trainingDataCount + ' puntos';
}

// Función para terminar el juego
function finJuego() {
  juego.paused = true;
  gameModeElement.textContent = 'Fin del juego - Modo: ' + (modoAutomático ? 'Automático' : 'Manual');
  setTimeout(reiniciarJuego, 3000); // Reiniciar el juego después de 3 segundos
}

// Función para reiniciar el juego
function reiniciarJuego() {
  juego.paused = false;
  personaje.x = juego.world.centerX;
  personaje.y = juego.world.centerY;
  personaje.body.velocity.x = 0;
  personaje.body.velocity.y = 0;

  esfera.x = juego.world.randomX;
  esfera.y = juego.world.randomY;
  esfera.body.velocity.set(200, 200);

  datosEntrenamiento = [];
  trainingDataCount = 0;
  entrenamientoCompleto = false;
  modoAutomático = false;
  gameModeElement.textContent = 'Manual';
  survivalTimeElement.textContent = '0s';
  trainingDataElement.textContent = '0 puntos';

  startTime = juego.time.now;

  console.log('Juego reiniciado');
}

// Función para entrenar la red neuronal
function entrenarRedNeuronal() {
  if (datosEntrenamiento.length > 0) {
    if (!redNeuronal) {
      console.error("Red neuronal no está definida");
      return;
    }
    try {
      var entrenador = new synaptic.Trainer(redNeuronal);
      entrenador.train(datosEntrenamiento, {
        rate: 0.3,
        iterations: 10000,
        error: 0.005,
        shuffle: true,
        log: 1000,
        cost: synaptic.Trainer.cost.CROSS_ENTROPY
      });
      entrenamientoCompleto = true;
      console.log('Entrenamiento completo');
    } catch (error) {
      console.error("Error en el entrenamiento: ", error);
    }
  } else {
    console.log('No hay datos de entrenamiento disponibles');
  }
}
