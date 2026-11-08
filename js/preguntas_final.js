// Preguntas nuevas del examen final que combinan los 5 temas
// var (no const) para que el motor lo encuentre por su nombre en window
var preguntas_final = [
  {
    pregunta: "¿Qué vulnerabilidad tiene este panel.php?",
    codigo: "<?php\n// panel.php\n?>\n<h1>Panel de administración</h1>\n<?php echo listarClientes(); ?>",
    opciones: [
      { texto: "XSS persistente.", explicacion: "No se muestra ningún texto escrito por un usuario." },
      { texto: "Contraseña en texto plano.", explicacion: "No se guarda ni se compara ninguna contraseña aquí." },
      { texto: "Variables de sesión: no valida la sesión y se entra escribiendo la URL.", explicacion: "Falta session_start() + if(!isset($_SESSION[...])) { header(...); exit; } (módulo 1)." },
      { texto: "Fuerza bruta.", explicacion: "No hay ningún login en este archivo." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué vulnerabilidad tiene este alta de usuario?",
    codigo: "$stmt = $pdo->prepare('INSERT INTO usuarios (email, clave) VALUES (?, ?)');\n$stmt->execute([$email, $_POST['clave']]);",
    opciones: [
      { texto: "Inyección SQL.", explicacion: "Usa consulta preparada: no hay inyección SQL." },
      { texto: "La contraseña se guarda en texto plano: si se filtra la base, se leen todas.", explicacion: "Habría que guardar password_hash($_POST['clave'], PASSWORD_DEFAULT) (módulo 2)." },
      { texto: "XSS.", explicacion: "No se muestra nada en la página." },
      { texto: "Fijación de sesión.", explicacion: "No se toca la sesión." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué ataque permite este login?",
    codigo: "$fila = buscarUsuario($pdo, $usuario);\nif ($fila && password_verify($clave, $fila['clave'])) {\n    session_regenerate_id(true);\n    $_SESSION['usuario'] = $fila['nombre'];\n} else {\n    echo 'Usuario o contraseña incorrectos';\n}",
    opciones: [
      { texto: "Fuerza bruta: no cuenta los fallos ni bloquea, se pueden probar claves sin límite.", explicacion: "Faltan el contador por usuario, el bloqueo y el límite por IP (módulo 3)." },
      { texto: "Fijación de sesión.", explicacion: "Ya regenera el ID con session_regenerate_id(true)." },
      { texto: "Enumeración de usuarios.", explicacion: "Usa un mensaje único." },
      { texto: "Contraseña en texto plano.", explicacion: "Usa password_verify, así que la base guarda un hash." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué vulnerabilidad tiene este paso de “olvidé mi contraseña”?",
    codigo: "// nueva_clave.php\n$email = $_GET['email'] ?? '';\n$hash = password_hash($_POST['clave'], PASSWORD_DEFAULT);\n$pdo->prepare('UPDATE usuarios SET clave = ? WHERE email = ?')\n    ->execute([$hash, $email]);",
    opciones: [
      { texto: "Guarda la contraseña nueva en texto plano.", explicacion: "Usa password_hash: guarda un hash." },
      { texto: "Inyección SQL.", explicacion: "Usa consulta preparada." },
      { texto: "XSS reflejado.", explicacion: "No muestra $email en la página." },
      { texto: "La cuenta sale de la URL: cambiando ?email= se cambia la contraseña de otro.", explicacion: "La cuenta tiene que salir de la sesión, ligada al código verificado (módulo 4, CP-07)." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué vulnerabilidad tiene este fragmento?",
    codigo: "$stmt = $pdo->prepare('SELECT texto FROM comentarios WHERE producto = ?');\n$stmt->execute([$id]);\nforeach ($stmt as $c) {\n    echo '<p>' . $c['texto'] . '</p>';\n}",
    opciones: [
      { texto: "Inyección SQL.", explicacion: "La consulta es preparada." },
      { texto: "Fuerza bruta.", explicacion: "No hay ningún login." },
      { texto: "XSS persistente: muestra comentarios guardados sin htmlspecialchars.", explicacion: "La consulta preparada protege la base, pero no la salida HTML (módulo 5)." },
      { texto: "Ninguna.", explicacion: "El echo muestra texto de usuarios sin codificar." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cuál de estas parejas medida → ataque es correcta?",
    opciones: [
      { texto: "htmlspecialchars() → fuerza bruta.", explicacion: "htmlspecialchars() protege contra XSS." },
      { texto: "password_hash() → fijación de sesión.", explicacion: "password_hash() protege las claves si se filtra la base." },
      { texto: "Límite de intentos → XSS.", explicacion: "El límite de intentos frena la fuerza bruta." },
      { texto: "session_regenerate_id(true) → fijación de sesión.", explicacion: "Al autenticar cambia el ID y el que conocía el atacante deja de servir." }
    ],
    correcta: 3
  },
  {
    pregunta: "Un sistema guarda las contraseñas con password_hash() y su login es este. ¿Hace falta limitar los intentos?",
    codigo: "if ($fila && password_verify($clave, $fila['clave'])) {\n    // entra\n}\n// sin contador ni bloqueo",
    opciones: [
      { texto: "No: el hash ya impide adivinar la contraseña.", explicacion: "El hash protege la base filtrada; por el login, el sistema verifica cada intento normalmente." },
      { texto: "Sí: el hash no frena a quien prueba claves por el formulario; eso lo hace el límite de intentos.", explicacion: "Son dos defensas distintas: módulo 2 (base filtrada) y módulo 3 (intentos por el login)." },
      { texto: "No, porque password_verify bloquea solo.", explicacion: "password_verify solo devuelve true o false." },
      { texto: "Solo si las contraseñas están en texto plano.", explicacion: "Con hash o sin hash, por el login se puede probar sin límite." }
    ],
    correcta: 1
  },
  {
    pregunta: "Este sitio configura la cookie HttpOnly pero muestra los mensajes así. ¿Qué pasa?",
    codigo: "ini_set('session.cookie_httponly', 1);\nsession_start();\n...\necho '<div>' . $m['texto'] . '</div>';",
    opciones: [
      { texto: "Está protegido: HttpOnly evita el XSS.", explicacion: "HttpOnly no evita el XSS." },
      { texto: "Sigue teniendo XSS: el script se ejecuta igual; solo no puede leer la cookie con document.cookie.", explicacion: "La defensa del XSS es htmlspecialchars al mostrar; HttpOnly es una capa extra (módulos 1 y 5)." },
      { texto: "Tiene fijación de sesión por usar HttpOnly.", explicacion: "HttpOnly no tiene relación con la fijación." },
      { texto: "La cookie viaja cifrada.", explicacion: "HttpOnly no cifra; eso lo da HTTPS." }
    ],
    correcta: 1
  },
  {
    pregunta: "Este código usa consulta preparada. ¿De qué protege y de qué no?",
    codigo: "$stmt = $pdo->prepare('INSERT INTO mensajes (texto) VALUES (?)');\n$stmt->execute([$_POST['texto']]);\n...\necho '<p>' . $fila['texto'] . '</p>';",
    opciones: [
      { texto: "Protege de todo.", explicacion: "Falta codificar la salida." },
      { texto: "Protege de XSS, pero no de inyección SQL.", explicacion: "Es al revés." },
      { texto: "Protege de inyección SQL, pero no de XSS: el echo muestra el texto sin htmlspecialchars.", explicacion: "Cada ataque tiene su defensa: consulta preparada para SQL, codificar la salida para XSS." },
      { texto: "No protege de nada.", explicacion: "La consulta preparada sí evita la inyección SQL." }
    ],
    correcta: 2
  },
  {
    pregunta: "Un atacante robó el PHPSESSID de una víctima mediante XSS. ¿Qué medida ataca la causa?",
    opciones: [
      { texto: "Codificar la salida con htmlspecialchars(), para que el script no se ejecute.", explicacion: "Sin XSS no hay robo; HttpOnly y el cierre de sesión completo ayudan además (módulos 1 y 5)." },
      { texto: "Guardar las contraseñas con password_hash().", explicacion: "El atacante no necesita la contraseña: usa la sesión." },
      { texto: "Limitar los intentos de login.", explicacion: "No hubo intentos de login." },
      { texto: "Cambiar rand() por random_int().", explicacion: "Eso es para el código de recuperación." }
    ],
    correcta: 0
    },
  {
    pregunta: "Este código codifica la salida con htmlspecialchars. ¿Qué vulnerabilidad sigue teniendo?",
    codigo: "$sql = \"SELECT nombre FROM clientes WHERE ciudad = '$ciudad'\";\nforeach ($con->query($sql) as $c) {\n    echo '<p>' . htmlspecialchars($c['nombre'], ENT_QUOTES, 'UTF-8') . '</p>';\n}",
    opciones: [
      { texto: "XSS, porque falta textContent.", explicacion: "La salida ya está codificada con htmlspecialchars: el XSS está cubierto." },
      { texto: "Ninguna: htmlspecialchars protege todo.", explicacion: "htmlspecialchars protege lo que se muestra, no la consulta." },
      { texto: "Inyección SQL: la consulta sigue concatenando $ciudad.", explicacion: "Cada ataque tiene su defensa: consulta preparada para SQL, codificar la salida para XSS (módulos 5 y 6)." },
      { texto: "Fijación de sesión.", explicacion: "No se toca la sesión." }
    ],
    correcta: 2
  },
  {
    pregunta: "Este login ya usa consulta preparada. ¿Qué problema sigue teniendo?",
    codigo: "$stmt = $con->prepare(\"SELECT id FROM usuarios WHERE usuario = ? AND clave = ?\");\n$stmt->bind_param(\"ss\", $usuario, $clave);\n$stmt->execute();\n// en la tabla, la columna clave tiene las contraseñas tal cual",
    opciones: [
      { texto: "Inyección SQL.", explicacion: "Usa consulta preparada con bind_param." },
      { texto: "Las contraseñas están en texto plano: si se filtra la base, se leen todas.", explicacion: "Habría que guardar password_hash y comparar con password_verify (módulos 2 y 6)." },
      { texto: "XSS.", explicacion: "No se muestra nada en la página." },
      { texto: "Ninguno.", explicacion: "Guardar las claves tal cual es un problema aparte." }
    ],
    correcta: 1
  }
];
