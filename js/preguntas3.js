// Preguntas del examen del módulo 3: fuerza bruta
// var (no const) para que el motor lo encuentre por su nombre en window
var preguntas3 = [
  {
    pregunta: "¿Qué es un ataque de fuerza bruta?",
    opciones: [
      { texto: "Inyectar código SQL en el formulario de login.", explicacion: "Eso es inyección SQL, otro tema." },
      { texto: "Probar contraseñas de forma automática hasta acertar, aprovechando que el login no limita los intentos.", explicacion: "Por eso la defensa es limitar y bloquear los intentos." },
      { texto: "Robar la cookie de sesión de otro usuario.", explicacion: "Eso es secuestro de sesión." },
      { texto: "Apagar el servidor con muchos pedidos.", explicacion: "Eso es una denegación de servicio, no adivinar contraseñas." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué es el password spraying?",
    opciones: [
      { texto: "Probar todas las combinaciones posibles contra un usuario.", explicacion: "Eso es fuerza bruta pura." },
      { texto: "Probar una lista de contraseñas comunes contra un usuario.", explicacion: "Eso es un ataque de diccionario." },
      { texto: "Guardar las contraseñas con hash.", explicacion: "Eso es una protección, no un ataque." },
      { texto: "Probar una sola contraseña común contra muchos usuarios, para no disparar el bloqueo de ninguno.", explicacion: "Por eso hace falta el límite por IP, además del bloqueo por usuario." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué le falta a este login vulnerable para resistir la fuerza bruta?",
    codigo: "$sql = \"SELECT * FROM usuarios WHERE asu_nombre = ? AND asu_clave = ?\";\n$stmt = $con->prepare($sql);\n$stmt->bind_param(\"ss\", $usuario, $clave);\n$stmt->execute();\n$fila = $stmt->get_result()->fetch_assoc();\nregistrarIntento($con, $usuario, $ip, $fila ? \"exitoso\" : \"fallido\");",
    opciones: [
      { texto: "Un límite de intentos y un bloqueo.", explicacion: "Así como está, se puede repetir sin fin; el registro guarda los intentos pero nada actúa sobre ellos." },
      { texto: "Una consulta preparada.", explicacion: "Ya usa prepare y bind_param." },
      { texto: "Registrar los intentos.", explicacion: "Ya llama a registrarIntento." },
      { texto: "Nada; ya está protegido.", explicacion: "No hay contador ni bloqueo: el atacante prueba cuantas claves quiera." }
    ],
    correcta: 0
  },
  {
    pregunta: "El mismo código vulnerable: ¿tiene inyección SQL?",
    codigo: "$sql = \"SELECT * FROM usuarios WHERE asu_nombre = ? AND asu_clave = ?\";\n$stmt = $con->prepare($sql);\n$stmt->bind_param(\"ss\", $usuario, $clave);",
    opciones: [
      { texto: "Sí, porque compara la clave en la consulta.", explicacion: "Compararla en la consulta no causa inyección si va como parámetro." },
      { texto: "Sí, porque usa SELECT *.", explicacion: "SELECT * no tiene relación con la inyección." },
      { texto: "No: usa consulta preparada. Sus problemas son no limitar intentos y guardar la clave en texto plano.", explicacion: "Es lo que señala el informe sobre la versión vulnerable." },
      { texto: "No, porque la clave está cifrada.", explicacion: "La clave está en texto plano; no hay cifrado." }
    ],
    correcta: 2
  },
  {
    pregunta: "En Banco Alfa, ¿qué pasa al tercer fallo seguido de un usuario que nunca fue bloqueado?",
    codigo: "IF(asu_intentos + 1 >= 3,\n   IF(asu_bloqueos = 0, DATE_ADD(NOW(), INTERVAL 2 MINUTE), '9999-12-31'),\n   asu_bloqueado_hasta)",
    opciones: [
      { texto: "Se bloquea para siempre.", explicacion: "El bloqueo permanente es la segunda vez (asu_bloqueos ya no es 0)." },
      { texto: "Se bloquea 2 minutos.", explicacion: "Como asu_bloqueos = 0, se usa DATE_ADD(NOW(), INTERVAL 2 MINUTE)." },
      { texto: "Responde 429.", explicacion: "429 es el límite por IP, no por usuario." },
      { texto: "No pasa nada hasta el décimo fallo.", explicacion: "10 es el límite por IP; por usuario son 3." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué calcula esta expresión de MySQL?",
    codigo: "DATE_ADD(NOW(), INTERVAL 2 MINUTE)",
    opciones: [
      { texto: "Hace dos minutos.", explicacion: "DATE_ADD suma; para restar sería DATE_SUB." },
      { texto: "Cuántos minutos faltan para desbloquear.", explicacion: "Devuelve una fecha, no una cantidad de minutos." },
      { texto: "La fecha y hora de dentro de 2 minutos: hasta cuándo dura el bloqueo.", explicacion: "NOW() es ahora y DATE_ADD le suma 2 minutos." },
      { texto: "Bloquea el servidor 2 minutos.", explicacion: "Solo calcula una fecha; el que bloquea es el código que la compara." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Por qué Banco Alfa calcula las fechas del bloqueo con NOW() en MySQL y no con date() en PHP?",
    codigo: "-- se guarda:\nasu_bloqueado_hasta = DATE_ADD(NOW(), INTERVAL 2 MINUTE)\n-- se compara:\nasu_bloqueado_hasta > NOW()",
    opciones: [
      { texto: "Porque date() de PHP no existe.", explicacion: "date() existe en PHP." },
      { texto: "Porque NOW() es más seguro contra XSS.", explicacion: "No tiene relación con XSS." },
      { texto: "Porque así el bloqueo dura más.", explicacion: "La duración es la misma; lo que cambia es de dónde sale la hora." },
      { texto: "Para que guardar y comparar usen el mismo reloj y no haya desfase de zona horaria.", explicacion: "Si PHP y MySQL tienen distinta zona horaria, el bloqueo podría durar de más o de menos." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Cuál es el problema de contar los fallos así?",
    codigo: "$intentos = leerIntentos($con, $usuario);   // SELECT\n$intentos = $intentos + 1;\nguardarIntentos($con, $usuario, $intentos);  // UPDATE",
    opciones: [
      { texto: "Dos intentos al mismo tiempo pueden leer el mismo número y perder un fallo (condición de carrera).", explicacion: "Por eso el informe usa un solo UPDATE: asu_intentos = asu_intentos + 1." },
      { texto: "Ninguno; es la forma recomendada.", explicacion: "Separar leer y escribir deja un hueco entre los dos pasos." },
      { texto: "Que PHP no puede sumar números.", explicacion: "Puede; el problema es el tiempo entre leer y guardar." },
      { texto: "Que tiene inyección SQL.", explicacion: "No se ve ninguna consulta armada con texto del usuario." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué hace esta parte de acceso.php (versión segura)?",
    codigo: "if (fallosDeIp($con, $ip) >= 10) {\n    registrarIntento($con, $usuario, $ip, \"bloqueado_ip\");\n    http_response_code(429);\n    exit;\n}",
    opciones: [
      { texto: "Bloquea la cuenta del usuario para siempre.", explicacion: "Es un límite por IP, no un bloqueo de la cuenta." },
      { texto: "Si la IP ya falló 10 veces (en 15 min), responde 429 “demasiadas peticiones” y corta.", explicacion: "Frena el password spraying, que cambia de usuario pero no de máquina." },
      { texto: "Responde 401 porque la clave es incorrecta.", explicacion: "El código que devuelve es 429, no 401." },
      { texto: "Cambia la IP del atacante.", explicacion: "El servidor no puede cambiar la IP del cliente." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué hace este control al principio de acceso.php?",
    codigo: "if ($_SERVER[\"REQUEST_METHOD\"] !== \"POST\") {\n    http_response_code(405);\n    exit;\n}",
    opciones: [
      { texto: "Bloquea la IP del usuario.", explicacion: "No mira la IP; mira el método HTTP." },
      { texto: "Responde 429 si hay muchos intentos.", explicacion: "429 es otro control; aquí el código es 405." },
      { texto: "Solo acepta pedidos POST; si llega un GET, responde 405 (método no permitido).", explicacion: "Así el login no se puede pedir por la URL." },
      { texto: "Verifica la contraseña.", explicacion: "Todavía no compara ninguna contraseña." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cuál de estas respuestas al fallar el login es la versión vulnerable?",
    opciones: [
      { texto: "echo \"Usuario o contraseña incorrectos\"; (para todos los casos)", explicacion: "Es el mensaje único de la versión segura." },
      { texto: "http_response_code(401); echo json_encode([\"mensaje\" => \"Usuario o contraseña incorrectos\"]);", explicacion: "Es la respuesta segura: mismo mensaje siempre." },
      { texto: "if (!$fila) echo \"El usuario no existe\"; else echo \"Contraseña incorrecta\";", explicacion: "Dos mensajes distintos dejan saber qué usuarios existen (enumeración)." },
      { texto: "http_response_code(429); exit;", explicacion: "Es el límite por IP, no un mensaje de error de clave." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Para qué se verifica un hash falso cuando el usuario no existe?",
    codigo: "$hash = $fila ? $fila[\"asu_clave\"] : $HASH_FALSO;\n$claveOk = password_verify($clave, $hash) && $fila;",
    opciones: [
      { texto: "Para que el usuario inexistente pueda entrar.", explicacion: "&& $fila hace que sin usuario el resultado sea siempre falso." },
      { texto: "Para que el login tarde lo mismo exista o no el usuario, y no se pueda enumerar por tiempo.", explicacion: "password_verify tarda unos cientos de milisegundos; si se saltara, el inexistente respondería más rápido." },
      { texto: "Para crear el usuario automáticamente.", explicacion: "No crea nada; solo compara." },
      { texto: "Para guardar la contraseña en texto plano.", explicacion: "No guarda nada en la base." }
    ],
    correcta: 1
  },
  {
    pregunta: "La cuenta está en bloqueo temporal y el dueño escribe la clave correcta. Según este código, ¿qué pasa?",
    codigo: "if ($fila && $fila[\"bloqueada\"]) {\n    http_response_code(401);\n    echo json_encode([\"ok\" => false,\n        \"mensaje\" => \"Usuario o contraseña incorrectos\"]);\n    exit;\n}",
    opciones: [
      { texto: "Entra, porque la clave es correcta.", explicacion: "El control del bloqueo corta antes de dejarlo entrar." },
      { texto: "Recibe un 429.", explicacion: "El código que se envía es 401." },
      { texto: "Se desbloquea la cuenta.", explicacion: "Solo se desbloquea cuando vence el tiempo o lo hace Soporte." },
      { texto: "Se rechaza con el mensaje único: durante el bloqueo, ni la clave correcta sirve.", explicacion: "Es el resultado esperado del caso de prueba 5; si no, el bloqueo no frenaría al atacante." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué pasa si se borra este UPDATE que se ejecuta cuando el login es correcto?",
    codigo: "// login correcto\n$sql = \"UPDATE usuarios SET asu_intentos = 0, asu_bloqueos = 0,\n        asu_bloqueado_hasta = NULL WHERE asu_nombre = ?\";",
    opciones: [
      { texto: "Los fallos viejos se acumulan con los nuevos y un usuario legítimo puede quedar bloqueado por un solo error.", explicacion: "Por eso el informe reinicia los contadores tras un acceso correcto." },
      { texto: "El usuario no puede entrar nunca más.", explicacion: "Entra igual; el problema aparece en los próximos fallos." },
      { texto: "Se desactiva el límite por IP.", explicacion: "El límite por IP no depende de este UPDATE." },
      { texto: "Nada; es una línea decorativa.", explicacion: "Sin ella los contadores nunca vuelven a cero." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Para qué sirve esta línea, que se ejecuta en cada intento?",
    codigo: "registrarIntento($con, $usuario, $ip, \"fallido\");",
    opciones: [
      { texto: "Para bloquear la cuenta.", explicacion: "El bloqueo lo decide el UPDATE del contador." },
      { texto: "Para enviar un correo al usuario.", explicacion: "No envía correos; guarda un registro." },
      { texto: "Para guardar usuario, IP, resultado y fecha: deja rastro y permite contar los fallos por IP.", explicacion: "Es el registro de intentos que pide la consigna." },
      { texto: "Para cerrar la sesión.", explicacion: "No toca la sesión." }
    ],
    correcta: 2
  },
  {
    pregunta: "Un PIN de 4 dígitos va de 0000 a 9999. Si el login no tiene límite, ¿cuántos intentos necesita como máximo este programa del atacante?",
    codigo: "for ($i = 0; $i <= 9999; $i++) {\n    $pin = str_pad($i, 4, \"0\", STR_PAD_LEFT);\n    probarLogin(\"admin\", $pin);\n}",
    opciones: [
      { texto: "4", explicacion: "4 es la cantidad de dígitos, no de combinaciones." },
      { texto: "10.000; y con el bloqueo de Banco Alfa, solo podría probar 3 antes del primer bloqueo.", explicacion: "Por eso limitar los intentos frena la fuerza bruta." },
      { texto: "9.999.999", explicacion: "Con 4 dígitos hay 10.000 combinaciones." },
      { texto: "Es imposible adivinarlo.", explicacion: "Sin límite, probando todo, siempre se acierta." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué significan los códigos HTTP 401 y 429 en Banco Alfa?",
    codigo: "http_response_code(401);  // A\nhttp_response_code(429);  // B",
    opciones: [
      { texto: "A: servidor caído; B: página no encontrada.", explicacion: "Eso serían 500 y 404." },
      { texto: "A: método no permitido; B: cuenta borrada.", explicacion: "Método no permitido es 405." },
      { texto: "A: login correcto; B: sesión cerrada.", explicacion: "Un login correcto no devuelve 401." },
      { texto: "A: no autorizado (credenciales incorrectas); B: demasiadas peticiones (límite por IP).", explicacion: "401 = Unauthorized; 429 = Too Many Requests." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Cuál es una contra del bloqueo por cuenta que reconoce el informe?",
    opciones: [
      { texto: "Que hace más lento el login correcto.", explicacion: "El bloqueo no cambia la velocidad del login correcto." },
      { texto: "Que un atacante puede bloquear a propósito la cuenta de otro usuario escribiendo mal su clave.", explicacion: "Es una denegación de servicio; OWASP lo advierte." },
      { texto: "Que permite inyección SQL.", explicacion: "No tiene relación con la inyección SQL." },
      { texto: "Que guarda la contraseña en texto plano.", explicacion: "La versión segura guarda hash." }
    ],
    correcta: 1
  },
  {
    pregunta: "El límite por IP usa REMOTE_ADDR. ¿Qué problema puede causar en una oficina donde todos salen a Internet con la misma IP?",
    codigo: "$ip = $_SERVER[\"REMOTE_ADDR\"];",
    opciones: [
      { texto: "Los fallos de una persona cuentan para todos: al llegar a 10, todos reciben 429.", explicacion: "El informe lo señala como hallazgo; sugiere considerar X-Forwarded-For solo de proxies de confianza." },
      { texto: "Ninguno; cada computadora tiene su propia IP pública.", explicacion: "En una red compartida, el servidor ve la misma IP para todos." },
      { texto: "Las contraseñas se guardan en texto plano.", explicacion: "No tiene relación con el almacenamiento." },
      { texto: "Se regenera el ID de sesión de todos.", explicacion: "REMOTE_ADDR no toca la sesión." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué pide la consigna del profesor para el tema fuerza bruta?",
    opciones: [
      { texto: "Hash de contraseñas y diferenciar cifrado y codificación.", explicacion: "Eso es del tema protección de contraseñas." },
      { texto: "Codificación de salida según el contexto.", explicacion: "Eso es del tema XSS." },
      { texto: "Limitación de intentos, espera progresiva o bloqueo temporal, y registro de intentos.", explicacion: "Banco Alfa lo cumple con contadores, bloqueo escalonado, límite por IP y log_intentos." },
      { texto: "Consultas preparadas con parámetros.", explicacion: "Eso es del tema inyección SQL." }
    ],
    correcta: 2
  }
];
