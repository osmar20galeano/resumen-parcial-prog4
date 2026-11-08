// Preguntas del examen del módulo 6: inyección SQL
// var (no const) para que el motor lo encuentre por su nombre en window
var preguntas6 = [
  {
    pregunta: "¿Qué es la inyección SQL?",
    opciones: [
      { texto: "Que el navegador ejecute un script escrito por un usuario.", explicacion: "Eso es XSS." },
      { texto: "Que el dato que escribe el usuario termine siendo parte del código SQL y cambie la consulta.", explicacion: "Pasa cuando la consulta se arma pegando los datos." },
      { texto: "Probar contraseñas hasta acertar.", explicacion: "Eso es fuerza bruta." },
      { texto: "Guardar las contraseñas sin hash.", explicacion: "Eso es almacenamiento inseguro de contraseñas." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Cuál es el problema de esta línea?",
    codigo: "$sql = \"SELECT * FROM usuarios WHERE usuario = '$usuario' AND clave = '$clave'\";",
    opciones: [
      { texto: "Que usa SELECT *.", explicacion: "SELECT * no causa la inyección." },
      { texto: "Que le faltan los paréntesis.", explicacion: "La sintaxis es válida." },
      { texto: "Pega los datos del usuario dentro de la consulta: son parte del SQL y se pueden manipular.", explicacion: "Es concatenación; la solución es la consulta preparada con ?." },
      { texto: "Ninguno, porque está entre comillas.", explicacion: "Las comillas las puede cerrar el propio usuario con '." }
    ],
    correcta: 2
  },
  {
    pregunta: "Con este login concatenado, alguien escribe ' OR '1'='1 en usuario y en clave. ¿Qué pasa?",
    codigo: "$sql = \"SELECT * FROM usuarios WHERE usuario = '$usuario' AND clave = '$clave'\";\n// queda: ... WHERE usuario = '' OR '1'='1' AND clave = '' OR '1'='1'",
    opciones: [
      { texto: "La condición queda siempre verdadera, la consulta devuelve usuarios y el login deja entrar.", explicacion: "El OR '1'='1' hace verdadera toda la condición." },
      { texto: "La consulta da error y no entra.", explicacion: "Las comillas quedan balanceadas: no hay error." },
      { texto: "Busca un usuario llamado ' OR '1'='1.", explicacion: "Eso pasaría con la consulta preparada." },
      { texto: "Se bloquea la cuenta.", explicacion: "Nada en esta consulta bloquea cuentas." }
    ],
    correcta: 0
  },
  {
    pregunta: "Esta es la consulta que registró la versión vulnerable del informe. ¿Por qué se entró sin la clave correcta?",
    codigo: "SELECT id, nombre FROM acceso_lectura WHERE usuario = 'ana' -- -' AND 0 = 1 LIMIT 1",
    opciones: [
      { texto: "Porque 0 = 1 es verdadero.", explicacion: "0 = 1 es falso; justamente por eso tenía que rechazar." },
      { texto: "Porque LIMIT 1 deja entrar al primero.", explicacion: "LIMIT 1 también quedó dentro del comentario." },
      { texto: "Porque ana no tiene contraseña.", explicacion: "La clave era incorrecta (por eso aparece 0)." },
      { texto: "Porque la comilla cierra el usuario y -- - comenta el resto: desaparece el control AND 0 = 1.", explicacion: "La base ejecuta solo WHERE usuario = 'ana'." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué hacen -- y # en estas entradas?",
    codigo: "Usuario: ana' -- -\nUsuario: ana'#",
    opciones: [
      { texto: "Marcan el fin de la contraseña.", explicacion: "No tienen relación con la contraseña." },
      { texto: "Abren un comentario en MySQL: todo lo que sigue en la consulta se ignora.", explicacion: "-- necesita un espacio después (por eso -- -); # no." },
      { texto: "Cifran el usuario.", explicacion: "No cifran nada." },
      { texto: "Hacen que la consulta dé error.", explicacion: "La consulta sigue siendo válida: por eso funciona el ataque." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué función va en el hueco?",
    codigo: "$sql = \"SELECT id, nombre FROM usuarios WHERE usuario = ?\";\n$stmt = $con->__________($sql);\n$stmt->bind_param(\"s\", $usuario);\n$stmt->execute();",
    opciones: [
      { texto: "query", explicacion: "query ejecuta el texto tal cual; con ? no tendría datos." },
      { texto: "real_escape_string", explicacion: "Escapa un texto; no prepara consultas." },
      { texto: "prepare", explicacion: "Prepara la estructura con los ? antes de recibir los datos." },
      { texto: "fetch_assoc", explicacion: "Lee una fila del resultado; va al final." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué significa \"ss\" en esta línea?",
    codigo: "$stmt->bind_param(\"ss\", $usuario, $clave);",
    opciones: [
      { texto: "Que son dos datos de tipo texto (string), uno por cada ?.", explicacion: "s = string; una letra por cada ?, en orden." },
      { texto: "Que la consulta es segura (safe, safe).", explicacion: "Las letras indican el tipo de dato." },
      { texto: "Que hay que repetir la consulta dos veces.", explicacion: "Se ejecuta una vez." },
      { texto: "Que los datos son sesiones.", explicacion: "No tiene relación con la sesión." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué letras van en bind_param para esta consulta? (nombre es texto, stock es entero y precio es decimal)",
    codigo: "$stmt = $con->prepare(\"INSERT INTO productos (nombre, stock, precio) VALUES (?, ?, ?)\");\n$stmt->bind_param(\"___\", $nombre, $stock, $precio);",
    opciones: [
      { texto: "\"sss\"", explicacion: "Funcionaría, pero no indica los tipos correctos: stock es entero y precio decimal." },
      { texto: "\"ids\"", explicacion: "El orden de las letras tiene que seguir el orden de los ?." },
      { texto: "\"sid\"", explicacion: "s = texto (nombre), i = entero (stock), d = decimal (precio)." },
      { texto: "\"s\"", explicacion: "Hay tres ?: van tres letras." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué está mal en esta línea?",
    codigo: "$stmt = $con->prepare(\"SELECT * FROM usuarios WHERE usuario = ? AND clave = ?\");\n$stmt->bind_param(\"s\", $usuario, $clave);",
    opciones: [
      { texto: "Nada.", explicacion: "Hay dos ? y una sola letra." },
      { texto: "Que falta un exit.", explicacion: "exit no tiene relación." },
      { texto: "Que debería ser \"i\".", explicacion: "Son textos; el problema es la cantidad." },
      { texto: "Hay dos ? pero una sola letra: tiene que ser \"ss\", una letra por cada ?.", explicacion: "La cantidad de letras debe coincidir con la cantidad de ? y de variables." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Para qué sirven estas dos líneas después de execute()?",
    codigo: "$resultado = $stmt->get_result();\n$fila = $resultado->fetch_assoc();",
    opciones: [
      { texto: "Para preparar la consulta.", explicacion: "Eso es prepare, antes." },
      { texto: "Para traer el resultado del SELECT y leer una fila como arreglo (o null si no hay).", explicacion: "Con $fila se decide si el usuario existe." },
      { texto: "Para escapar los datos.", explicacion: "No escapan nada." },
      { texto: "Para cerrar la conexión.", explicacion: "Para eso está close()." }
    ],
    correcta: 1
  },
  {
    pregunta: "La versión protegida registró esta consulta. Si el usuario escribe ana' -- -, ¿qué pasa?",
    codigo: "SELECT id, nombre FROM acceso_lectura WHERE usuario = ? AND ? = 1 LIMIT 1",
    opciones: [
      { texto: "Se busca un usuario llamado literalmente ana' -- -: no existe y responde 401.", explicacion: "Los datos van aparte y nunca se interpretan como SQL (S03)." },
      { texto: "Entra como ana.", explicacion: "El -- no puede comentar nada: es parte del dato." },
      { texto: "Da error de sintaxis.", explicacion: "La estructura ya está fija; el dato no la rompe." },
      { texto: "Borra la tabla.", explicacion: "El dato no se ejecuta como código." }
    ],
    correcta: 0
  },
  {
    pregunta: "Un cliente se llama O'Brien. ¿Qué pasa con esta consulta concatenada?",
    codigo: "$sql = \"INSERT INTO clientes (nombre) VALUES ('$nombre')\";\n// queda: INSERT INTO clientes (nombre) VALUES ('O'Brien')",
    opciones: [
      { texto: "Se guarda O'Brien sin problema.", explicacion: "La comilla del nombre cierra el texto antes de tiempo." },
      { texto: "Se guarda Brien.", explicacion: "No llega a guardarse nada." },
      { texto: "Da error de sintaxis: la comilla de O'Brien cierra el texto y Brien queda suelto.", explicacion: "Con la consulta preparada se guarda bien (C02)." },
      { texto: "Se guarda O.", explicacion: "La consulta falla entera." }
    ],
    correcta: 2
  },
  {
    pregunta: "Un programador protege así su consulta. ¿Es la defensa principal contra la inyección SQL?",
    codigo: "$usuario = $con->real_escape_string($_POST['usuario']);\n$sql = \"SELECT * FROM usuarios WHERE usuario = '$usuario'\";",
    opciones: [
      { texto: "Sí, es igual de seguro que una consulta preparada.", explicacion: "Depende de no olvidarse nunca y de usarlo bien en cada lugar." },
      { texto: "Sí, y además evita el XSS.", explicacion: "No tiene relación con el XSS." },
      { texto: "No hace nada.", explicacion: "Algo ayuda, pero no es la defensa recomendada." },
      { texto: "No: escapar a mano ayuda, pero la defensa principal es la consulta preparada con ?.", explicacion: "OWASP y el manual de PHP recomiendan las consultas parametrizadas." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Por qué no funciona esta consulta preparada?",
    codigo: "$stmt = $con->prepare(\"SELECT * FROM ? WHERE id = ?\");\n$stmt->bind_param(\"si\", $tabla, $id);",
    opciones: [
      { texto: "Porque falta el exit.", explicacion: "No tiene relación." },
      { texto: "Porque el ? solo sirve para valores, no para el nombre de una tabla o columna.", explicacion: "Para elegir la tabla se usa una lista fija de nombres permitidos." },
      { texto: "Porque \"si\" está al revés.", explicacion: "El orden de letras no es el problema." },
      { texto: "Porque no se puede usar WHERE con ?.", explicacion: "Sí se puede: id = ? está bien." }
    ],
    correcta: 1
  },
  {
    pregunta: "Este sistema guarda las contraseñas con password_hash() y su login es así. ¿Tiene inyección SQL?",
    codigo: "$sql = \"SELECT id, clave_hash FROM usuarios WHERE usuario = '$usuario'\";\n$fila = $con->query($sql)->fetch_assoc();\nif ($fila && password_verify($clave, $fila['clave_hash'])) { /* entra */ }",
    opciones: [
      { texto: "No, porque las contraseñas tienen hash.", explicacion: "El hash protege las claves guardadas, no la consulta." },
      { texto: "No, porque usa password_verify.", explicacion: "password_verify no cambia cómo se arma la consulta." },
      { texto: "Sí: la consulta sigue concatenada. El hash protege otra cosa (la base filtrada).", explicacion: "En el informe, la versión vulnerable tenía hash y se entró igual." },
      { texto: "Solo si la contraseña es débil.", explicacion: "La inyección no depende de la contraseña." }
    ],
    correcta: 2
  },
  {
    pregunta: "Este código usa consulta preparada. ¿Qué vulnerabilidad sigue teniendo?",
    codigo: "$stmt = $con->prepare(\"SELECT texto FROM comentarios WHERE producto = ?\");\n$stmt->bind_param(\"i\", $id);\n$stmt->execute();\nforeach ($stmt->get_result() as $c) {\n    echo '<p>' . $c['texto'] . '</p>';\n}",
    opciones: [
      { texto: "XSS: muestra el texto sin htmlspecialchars.", explicacion: "La consulta preparada protege la base, no la página (módulo 5)." },
      { texto: "Inyección SQL.", explicacion: "Usa consulta preparada." },
      { texto: "Ninguna.", explicacion: "El echo muestra texto del usuario sin codificar." },
      { texto: "Fuerza bruta.", explicacion: "No hay login aquí." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cuál es el problema de mostrar este error en pantalla?",
    codigo: "$resultado = $con->query($sql) or die($con->error);",
    opciones: [
      { texto: "Que hace lenta la página.", explicacion: "La velocidad no es el problema." },
      { texto: "Ninguno; ayuda al usuario.", explicacion: "Ayuda más al atacante." },
      { texto: "Que borra la tabla.", explicacion: "Mostrar un error no borra nada." },
      { texto: "El error de MySQL le muestra al atacante partes de la consulta y nombres de tablas y columnas.", explicacion: "Se muestra un mensaje genérico y el error real se guarda en un registro." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Para qué sirve que el usuario con el que PHP se conecta a la base tenga privilegios mínimos?",
    opciones: [
      { texto: "Para que las consultas sean más rápidas.", explicacion: "No cambia la velocidad." },
      { texto: "Para que, si hay una inyección, el atacante solo pueda hacer lo que ese usuario tiene permitido.", explicacion: "Limita el daño; no reemplaza la consulta preparada." },
      { texto: "Para que no haga falta la consulta preparada.", explicacion: "Es una capa extra, no un reemplazo." },
      { texto: "Para evitar el XSS.", explicacion: "No tiene relación con el XSS." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué resultado observó el grupo en la prueba S02 (entrada SQL en la versión vulnerable)?",
    opciones: [
      { texto: "HTTP 401 en las dos versiones.", explicacion: "Eso fue S01, con credenciales normales incorrectas." },
      { texto: "Error de sintaxis.", explicacion: "La consulta fue válida." },
      { texto: "Con la clave incorrecta, se entró al menú.", explicacion: "En la protegida (S03), la misma entrada dio 401." },
      { texto: "Se bloqueó la cuenta 60 segundos.", explicacion: "El bloqueo es por 5 fallos, otra medida." }
    ],
    correcta: 2
  },
  {
    pregunta: "En las pruebas del sistema aparecen los códigos 409 y 422. ¿Qué indican?",
    opciones: [
      { texto: "409: conflicto (ej.: borrar algo que otro registro usa); 422: datos que no se pueden procesar (ej.: stock negativo).", explicacion: "Aparecen en C08, C09, C04 y C10." },
      { texto: "409: login correcto; 422: login incorrecto.", explicacion: "El login rechazado es 401." },
      { texto: "409: página no encontrada; 422: servidor caído.", explicacion: "Eso serían 404 y 500." },
      { texto: "Los dos significan inyección SQL detectada.", explicacion: "No hay un código HTTP para eso." }
    ],
    correcta: 0
  }
];
