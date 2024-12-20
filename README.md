# AxoGame

AxoGame es un juego de entrenamiento de redes neuronales utilizando Phaser y Synaptic. El objetivo del juego es entrenar una IA para que aprenda a evitar una esfera que rebota por la pantalla.

## Descripción del Proyecto

AxoGame es una aplicación interactiva que permite a los usuarios entrenar una red neuronal mediante el control de un personaje. El personaje debe moverse para evitar colisiones con una esfera en movimiento. El modo de juego puede alternarse entre manual y automático, donde en el modo automático la red neuronal controla al personaje basada en los datos de entrenamiento obtenidos.

## Contenidos del Proyecto

- `index.html`: Contiene la estructura HTML del juego.
- `style.css`: Archivo de estilos CSS para el diseño del juego.
- `proyecto5try3.js`: Archivo JavaScript que contiene la lógica del juego y el entrenamiento de la red neuronal.
- `assets/`: Carpeta que contiene las imágenes y sprites utilizados en el juego.
  - `game/fondo2.png`: Fondo del juego.
  - `sprites/axo.png`: Sprite del personaje.
  - `sprites/purple_ball.png`: Imagen de la esfera.
  - `sprites/altair2.png`: Imagen del botón de reinicio.
- `lib/`: Carpeta que contiene las librerías de Phaser y Synaptic.
  - `phaser.min.js`: Librería Phaser.
  - `synaptic.js`: Librería Synaptic.

## Instrucciones de Uso

1. Clona el repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador para iniciar el juego.

## Controles del Juego

- **W**: Mover hacia arriba
- **S**: Mover hacia abajo
- **A**: Mover hacia la izquierda
- **D**: Mover hacia la derecha
- **ESPACIO**: Cambiar entre modo Manual y Automático

## Modo de Juego

- **Manual**: El jugador controla al personaje utilizando las teclas de dirección.
- **Automático**: La red neuronal controla al personaje después de haber sido entrenada con datos de entrenamiento.

## Datos de Juego

- **Modo**: Muestra el modo actual del juego (Manual o Automático).
- **Datos de Entrenamiento**: Muestra la cantidad de puntos de datos de entrenamiento recopilados.
- **Tiempo de Supervivencia**: Muestra el tiempo que el personaje ha sobrevivido sin colisiones.

## Créditos

Desarrollado por [Tu Nombre] utilizando Phaser y Synaptic.

## Contacto

Para más información o consultas, puedes contactarme en [tuemail@example.com].
