// Preguntas del examen del módulo 1: variables de sesión
// var (no const) para que el motor lo encuentre por su nombre en window
var preguntas1 = [
  {
    pregunta: "¿Por qué una aplicación web necesita sesiones?",
    opciones: [
      { texto: "Porque HTTP cifra los datos y la sesión los descifra.", explicacion: "HTTP no cifra nada (eso lo hace HTTPS) y la sesión no tiene que ver con cifrar." },
      { texto: "Porque HTTP no tiene estado: cada pedido es independiente y el servidor no recuerda quién inició sesión.", explicacion: "La sesión permite reconocer al mismo usuario entre una página y otra." },
      { texto: "Porque sin sesión no se puede conectar a la base de datos.", explicacion: "La conexión a MySQL no depende de la sesión del usuario." },
      { texto: "Para que el navegador guarde la contraseña del usuario.", explicacion: "La sesión no guarda contraseñas en el navegador; el navegador solo guarda el identificador." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué guarda el navegador en la cookie PHPSESSID?",
    opciones: [
      { texto: "El nombre de usuario y el tipo de usuario.", explicacion: "Esos datos van en $_SESSION, que está en el servidor." },
      { texto: "La contraseña cifrada del usuario.", explicacion: "La contraseña nunca va en la cookie de sesión." },
      { texto: "Una copia completa de $_SESSION.", explicacion: "$_SESSION se guarda en el servidor; si estuviera en el navegador, el usuario podría modificarla." },
      { texto: "Solo el identificador de la sesión.", explicacion: "Con ese identificador el servidor busca los datos de la sesión." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Cuál es la diferencia principal entre una cookie y una sesión?",
    opciones: [
      { texto: "La cookie vive en el navegador y solo lleva el identificador; los datos de la sesión viven en el servidor.", explicacion: "Por eso el usuario no puede modificar los datos de la sesión." },
      { texto: "La cookie se guarda en el servidor y la sesión en el navegador.", explicacion: "Es al revés." },
      { texto: "No hay diferencia; son dos nombres para lo mismo.", explicacion: "Son cosas distintas, aunque la sesión use una cookie para viajar." },
      { texto: "La sesión solo funciona con HTTPS y la cookie solo con HTTP.", explicacion: "Las dos funcionan con HTTP y con HTTPS." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué hace la primera línea de este fragmento de menu.php?",
    codigo: "session_start();\nif(!isset($_SESSION[\"usuario\"])){\n    header(\"Location: index.php\");\n    exit;\n}",
    opciones: [
      { texto: "Cierra la sesión anterior y obliga a iniciar sesión otra vez.", explicacion: "No cierra nada; eso lo hace logout.php." },
      { texto: "Crea una sesión nueva o reanuda la existente según el identificador que manda el navegador.", explicacion: "Después de esto $_SESSION tiene los datos guardados y el if puede revisarlos." },
      { texto: "Verifica la contraseña del usuario en la base de datos.", explicacion: "Eso lo hace acceso.php al consultar la base." },
      { texto: "Redirige al login si no hay sesión.", explicacion: "La redirección la hace header(\"Location: ...\") dentro del if." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué falta en este código para que la página privada quede bien protegida?",
    codigo: "session_start();\nif(!isset($_SESSION[\"usuario\"])){\n    header(\"Location: index.php\");\n}\n// HTML del panel",
    opciones: [
      { texto: "Un session_destroy() dentro del if.", explicacion: "Destruir la sesión no detiene el script; el panel se seguiría enviando." },
      { texto: "Un session_regenerate_id(true) antes del if.", explicacion: "Regenerar el ID va al autenticar, no en cada página, y no corta el script." },
      { texto: "Un exit después del header.", explicacion: "Sin exit el script sigue y el HTML del panel viaja en la respuesta." },
      { texto: "Nada; header() ya detiene la ejecución.", explicacion: "header() solo agrega una cabecera; no detiene el script." }
    ],
    correcta: 2
  },
  {
    pregunta: "Este menu.php no tiene exit. Alguien sin sesión ejecuta curl -i .../menu.php. ¿Qué recibe?",
    codigo: "session_start();\nif(!isset($_SESSION[\"usuario\"])){\n    header(\"Location: index.php\");\n}\necho \"<h1>PANEL</h1> datos internos\";",
    opciones: [
      { texto: "Un error 404.", explicacion: "La página existe; no hay motivo para un 404." },
      { texto: "Un 302 con el cuerpo vacío.", explicacion: "Sin exit el echo se ejecuta, así que el cuerpo no queda vacío." },
      { texto: "Un error fatal de PHP porque header() necesita exit.", explicacion: "header() funciona sin exit; no hay error, y ese es justamente el problema." },
      { texto: "Un 302 con Location: index.php, pero en el cuerpo viene el HTML del panel.", explicacion: "El navegador redirigiría, pero curl muestra el contenido privado." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Contra qué ataque protege la primera línea de este fragmento de acceso.php?",
    codigo: "// contraseña correcta\nsession_regenerate_id(true);\n$_SESSION[\"usuario\"]=$fila[\"usu_nombre\"];\n$_SESSION[\"tipo\"]=$fila[\"usu_tipo\"];",
    opciones: [
      { texto: "Fijación de sesión.", explicacion: "El identificador que el atacante conocía antes del login deja de servir." },
      { texto: "Inyección SQL.", explicacion: "Contra la inyección SQL se usan consultas preparadas." },
      { texto: "XSS.", explicacion: "Contra el XSS se codifica la salida según el contexto." },
      { texto: "Fuerza bruta.", explicacion: "Contra la fuerza bruta se limitan los intentos o se bloquea temporalmente." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué hace el true en esta línea?",
    codigo: "session_regenerate_id(true);",
    opciones: [
      { texto: "Borra también los datos de $_SESSION.", explicacion: "Los datos se conservan; solo cambia el identificador." },
      { texto: "Hace que la cookie solo se envíe por HTTPS.", explicacion: "Eso es la marca Secure de la cookie." },
      { texto: "Borra la sesión vieja asociada al identificador anterior.", explicacion: "Así el ID anterior queda inutilizable." },
      { texto: "Cierra la sesión del usuario.", explicacion: "No cierra la sesión; el usuario sigue autenticado con un ID nuevo." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué línea va en el hueco, justo después de comprobar que la contraseña es correcta?",
    codigo: "}else if($clave==$fila[\"usu_clave\"]){\n    __________________;\n    $_SESSION[\"usuario\"]=$fila[\"usu_nombre\"];\n    $_SESSION[\"tipo\"]=$fila[\"usu_tipo\"];\n    echo\"OK\";\n}",
    opciones: [
      { texto: "session_destroy()", explicacion: "Destruiría la sesión justo cuando el usuario está entrando." },
      { texto: "session_regenerate_id(true)", explicacion: "Al autenticar cambia el privilegio: se da un ID nuevo y se borra el viejo." },
      { texto: "setcookie(session_name(), \"\", time()-42000)", explicacion: "Borraría la cookie de sesión y el usuario no podría entrar al panel." },
      { texto: "$_SESSION = array()", explicacion: "Vaciaría la sesión; no protege contra nada en este punto." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué le falta a este logout.php para hacer un cierre de sesión completo?",
    codigo: "session_start();\n$_SESSION=array();\nsession_destroy();\nheader(\"Location: ../index.php\");\nexit;",
    opciones: [
      { texto: "Un session_regenerate_id(true).", explicacion: "Regenerar va al iniciar sesión, no al cerrarla." },
      { texto: "Un isset($_SESSION[\"usuario\"]).", explicacion: "Comprobar la sesión no la cierra." },
      { texto: "Nada; session_destroy() ya borra todo.", explicacion: "session_destroy() no borra la cookie del navegador." },
      { texto: "Borrar la cookie con setcookie(session_name(), \"\", time()-42000, ...).", explicacion: "Con eso el navegador elimina la cookie PHPSESSID." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Para qué sirve time()-42000 en esta línea?",
    codigo: "setcookie(session_name(), \"\", time()-42000,\n    $parametros[\"path\"], $parametros[\"domain\"],\n    $parametros[\"secure\"], $parametros[\"httponly\"]\n);",
    opciones: [
      { texto: "Pone una fecha de vencimiento en el pasado para que el navegador borre la cookie.", explicacion: "Es la forma de borrar una cookie." },
      { texto: "Hace que la sesión dure 42000 segundos más.", explicacion: "Es una resta: la fecha queda en el pasado, no en el futuro." },
      { texto: "Bloquea al usuario por 42000 segundos.", explicacion: "No hay ningún bloqueo; eso sería del tema fuerza bruta." },
      { texto: "Espera 42000 segundos antes de cerrar la sesión.", explicacion: "setcookie no espera nada; solo envía la cabecera de la cookie." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Por qué el logout lee los parámetros de la cookie con esta línea?",
    codigo: "$parametros=session_get_cookie_params();",
    opciones: [
      { texto: "Para leer la contraseña guardada en la cookie.", explicacion: "La cookie no tiene contraseña; solo el identificador." },
      { texto: "Para borrar la cookie con la misma ruta, dominio, secure y httponly con que se creó.", explicacion: "Si los parámetros no coinciden, el navegador puede no borrarla." },
      { texto: "Para regenerar el identificador de sesión.", explicacion: "Eso es session_regenerate_id()." },
      { texto: "Para comprobar si el usuario es administrador.", explicacion: "El rol está en $_SESSION[\"tipo\"], no en los parámetros de la cookie." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué problema resuelven estas cabeceras en menu.php?",
    codigo: "header(\"Cache-Control: no-store, no-cache, must-revalidate\");\nheader(\"Pragma: no-cache\");\nheader(\"Expires: 0\");",
    opciones: [
      { texto: "Impiden el acceso directo por URL.", explicacion: "Eso lo impide la validación con isset y exit." },
      { texto: "Cifran el contenido del panel.", explicacion: "Las cabeceras de caché no cifran nada." },
      { texto: "Evitan que, después del logout, el botón “atrás” muestre el panel guardado por el navegador.", explicacion: "El navegador no guarda la copia y tiene que volver a pedir la página." },
      { texto: "Borran la cookie de sesión.", explicacion: "La cookie se borra con setcookie en logout.php." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cuál es la versión vulnerable de menu.php?",
    opciones: [
      { texto: "session_start(); if(!isset($_SESSION[\"usuario\"])){ header(\"Location: index.php\"); exit; }", explicacion: "Esta es la versión protegida: valida y corta." },
      { texto: "session_start(); session_regenerate_id(true); if(!isset($_SESSION[\"usuario\"])){ header(\"Location: index.php\"); exit; }", explicacion: "Valida la sesión y corta; el regenerate de más no la vuelve vulnerable." },
      { texto: "session_start(); if(isset($_SESSION[\"usuario\"])){ /* panel */ } else { header(\"Location: index.php\"); exit; }", explicacion: "Muestra el panel solo si existe la sesión; es otra forma correcta de validar." },
      { texto: "session_start(); $usuario=$_SESSION[\"usuario\"] ?? \"desconocido\"; (sin if ni exit)", explicacion: "Es la vulnerable del grupo: lee la sesión pero no la valida; cualquiera entra escribiendo la URL." }
    ],
    correcta: 3
  },
  {
    pregunta: "En este menu.php alguien se olvidó el signo !. ¿Qué pasa?",
    codigo: "session_start();\nif(isset($_SESSION[\"usuario\"])){\n    header(\"Location: index.php\");\n    exit;\n}\n// HTML del panel",
    opciones: [
      { texto: "Funciona igual que la versión protegida.", explicacion: "Sin el ! la condición queda invertida." },
      { texto: "El usuario que inició sesión es expulsado al login y el que no tiene sesión ve el panel.", explicacion: "isset da verdadero cuando hay sesión, así que redirige justo al usuario legítimo." },
      { texto: "PHP muestra un error de sintaxis.", explicacion: "La sintaxis es válida; el error es de lógica." },
      { texto: "Nadie puede ver el panel.", explicacion: "Quien no tiene sesión no entra al if y ve el panel." }
    ],
    correcta: 1
  },
  {
    pregunta: "En este menu.php falta session_start(). ¿Qué pasa con un usuario que inició sesión bien?",
    codigo: "if(!isset($_SESSION[\"usuario\"])){\n    header(\"Location: index.php\");\n    exit;\n}\n// HTML del panel",
    opciones: [
      { texto: "Entra normalmente, porque la sesión se abrió en acceso.php.", explicacion: "Cada pedido es independiente: si menu.php no reanuda la sesión, $_SESSION está vacío." },
      { texto: "Entra, pero sin poder ver su tipo de usuario.", explicacion: "No llega a entrar: el if lo expulsa antes." },
      { texto: "Siempre es redirigido al login, aunque haya iniciado sesión.", explicacion: "Sin session_start() $_SESSION no tiene datos, isset da falso y redirige." },
      { texto: "PHP borra la cookie PHPSESSID.", explicacion: "No se borra ninguna cookie; simplemente no se lee la sesión." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué se ve con este comando en la versión protegida, sin haber iniciado sesión?",
    codigo: "curl -i http://localhost/tp/login_protegido/menu.php",
    opciones: [
      { texto: "HTTP/1.1 200 OK y el HTML del panel.", explicacion: "Eso pasaría en la vulnerable, que no valida." },
      { texto: "Una ventana del navegador con el login.", explicacion: "curl trabaja en la terminal; no abre el navegador." },
      { texto: "HTTP/1.1 500 porque falta la cookie.", explicacion: "No hay error del servidor: la falta de sesión está prevista en el código." },
      { texto: "HTTP/1.1 302 con Location: index.php y sin el contenido del panel.", explicacion: "-i muestra las cabeceras, y sin -L curl no sigue la redirección." }
    ],
    correcta: 3
  },
  {
    pregunta: "Este logout.php no tiene session_start(). ¿Qué pasa?",
    codigo: "$_SESSION=array();\nsession_destroy();\nheader(\"Location: ../index.php\");\nexit;",
    opciones: [
      { texto: "La sesión no se destruye: session_destroy() falla porque no hay una sesión abierta en el script.", explicacion: "Sin session_start() no hay sesión activa que destruir; la sesión sigue guardada en el servidor." },
      { texto: "Funciona bien, porque $_SESSION=array() ya borra todo.", explicacion: "Vaciar el arreglo en este script no borra la sesión guardada en el servidor." },
      { texto: "El usuario queda bloqueado para siempre.", explicacion: "No hay ningún bloqueo; la sesión simplemente sigue viva." },
      { texto: "Se regenera el identificador de sesión.", explicacion: "Nada en este código regenera el identificador." }
    ],
    correcta: 0
  }
];
