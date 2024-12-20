# Proyecto 5: Juego Interactivo con Aprendizaje Automático

En este proyecto, implementamos un juego interactivo que utiliza el aprendizaje automático para controlar a un personaje. Aquí están los pasos clave del proyecto:

1. **Configuración del juego**: Creamos una nueva instancia de un juego Phaser con funciones de precarga, creación y actualización.

2. **Preload**: Precargamos las imágenes y sprites que se utilizarán en el juego.

3. **Create**: Creamos y configuramos los objetos del juego, como el personaje y la esfera, configuramos las teclas de control, añadimos texto para mostrar el modo de juego y un botón para reiniciar el juego, y creamos una nueva red neuronal.

4. **Update**: Actualizamos el estado del juego en cada frame. Si el juego está en modo manual, controlamos al personaje con las teclas. Si el juego está en modo automático y el entrenamiento está completo, controlamos al personaje con la red neuronal. Detectamos colisiones entre el personaje y la esfera.

5. **Funciones auxiliares**: Definimos varias funciones auxiliares para obtener las entradas para la red neuronal, registrar los movimientos del personaje, terminar el juego, reiniciar el juego y entrenar la red neuronal.

Este proyecto demuestra cómo se puede utilizar el aprendizaje automático en un juego interactivo.
