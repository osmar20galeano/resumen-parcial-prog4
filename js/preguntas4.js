// Preguntas del examen del módulo 4: recuperación segura de contraseñas
// var (no const) para que el motor lo encuentre por su nombre en window
var preguntas4 = [
  {
    pregunta: "¿Por qué la recuperación de contraseña se considera una “segunda puerta” a la cuenta?",
    opciones: [
      { texto: "Porque obliga a tener dos contraseñas.", explicacion: "No pide dos contraseñas; permite cambiar la que hay." },
      { texto: "Porque permite cambiar la contraseña sin conocer la anterior; si es débil, anula un login fuerte.", explicacion: "Por eso tiene que ser al menos tan segura como el inicio de sesión." },
      { texto: "Porque es un segundo factor de autenticación.", explicacion: "No es un segundo factor; es otro camino para entrar." },
      { texto: "Porque solo funciona para los administradores.", explicacion: "Cualquier usuario puede recuperar su contraseña." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué problema tiene este fragmento de la versión 1 (recuperar.php)?",
    codigo: "if (!$usuario) {\n    $mensaje = 'No existe ninguna cuenta registrada con ese correo.';\n}",
    opciones: [
      { texto: "Revela qué correos tienen cuenta (enumeración de usuarios).", explicacion: "La versión 2 responde siempre lo mismo, exista o no la cuenta (CP-03)." },
      { texto: "Tiene inyección SQL.", explicacion: "No hay ninguna consulta en este fragmento." },
      { texto: "No envía el código.", explicacion: "Si no hay cuenta, no hay a quién enviarlo; el problema es el mensaje." },
      { texto: "Ninguno; ayuda al usuario a saber si se equivocó.", explicacion: "También ayuda al atacante: le dice qué correos son reales." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué está mal en esta línea que crea el código?",
    codigo: "$codigo = (string) rand(100000, 999999);",
    opciones: [
      { texto: "Que el código tiene 7 dígitos.", explicacion: "Va de 100000 a 999999: siempre 6 dígitos." },
      { texto: "Que (string) convierte el número en texto.", explicacion: "Convertirlo a texto no es el problema." },
      { texto: "Nada; rand() es la función recomendada.", explicacion: "El manual de PHP dice que rand() no debe usarse para secretos." },
      { texto: "rand() no es criptográficamente seguro: sus valores se pueden predecir.", explicacion: "Para secretos se usa random_int()." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué función va en el hueco de la versión 2?",
    codigo: "$codigo = str_pad((string) __________(0, 999999), 6, '0', STR_PAD_LEFT);",
    opciones: [
      { texto: "rand", explicacion: "rand() es justo lo que la versión 2 reemplaza." },
      { texto: "md5", explicacion: "md5 calcula un hash, no genera números al azar." },
      { texto: "random_int", explicacion: "Genera enteros criptográficamente seguros." },
      { texto: "password_hash", explicacion: "password_hash calcula un hash; no genera el número." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Para qué sirve str_pad en esta línea?",
    codigo: "$codigo = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);",
    opciones: [
      { texto: "Para cifrar el código.", explicacion: "str_pad no cifra nada." },
      { texto: "Para completar con ceros a la izquierda y que siempre tenga 6 dígitos (ej. 4213 → 004213).", explicacion: "random_int(0, 999999) puede dar números cortos; str_pad los completa." },
      { texto: "Para borrar los espacios.", explicacion: "Eso lo hace trim()." },
      { texto: "Para guardar el código en la base.", explicacion: "Solo arma el texto; el guardado es otra línea." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Por qué la versión 2 guarda esto en la base en lugar del código?",
    codigo: "$hash = password_hash($codigo, PASSWORD_DEFAULT);",
    opciones: [
      { texto: "Para que quien lea la tabla no pueda usar el código.", explicacion: "En CP-08, la versión 2 solo mostró un hash de 60 caracteres." },
      { texto: "Para que el código dure más.", explicacion: "El vencimiento se maneja con expira_en, no con el hash." },
      { texto: "Para poder mostrárselo al usuario después.", explicacion: "Un hash no se puede revertir." },
      { texto: "Porque MySQL no guarda números.", explicacion: "MySQL guarda números sin problema." }
    ],
    correcta: 0
  },
  {
    pregunta: "En CP-08 la tabla de la versión 1 quedó así. ¿Qué dos problemas muestra?",
    codigo: "codigo   estado   creado_en             expira_en\n365161   activo   2026-11-03 11:55:50   NULL",
    opciones: [
      { texto: "El código es muy corto y está bloqueado.", explicacion: "El estado es activo, no bloqueado." },
      { texto: "Falta el hash de la contraseña y el usuario.", explicacion: "La tabla es de códigos, no de contraseñas." },
      { texto: "Que el creado_en está mal.", explicacion: "La fecha de creación no es un problema." },
      { texto: "El código se lee tal cual (texto plano) y no vence (expira_en es NULL).", explicacion: "La versión 2 guarda un hash y una fecha de vencimiento 10 minutos después." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué guarda esta parte del INSERT de la versión 2?",
    codigo: "... VALUES (2, ?, ?, NOW() + INTERVAL 10 MINUTE)",
    opciones: [
      { texto: "La hora en que se creó el código.", explicacion: "Sería NOW() sin sumar nada." },
      { texto: "Cuántos minutos lleva el usuario conectado.", explicacion: "No mide la conexión." },
      { texto: "La fecha de vencimiento: ahora más 10 minutos.", explicacion: "Después de esa hora, el código se rechaza (CP-06)." },
      { texto: "Que el usuario se bloquee 10 minutos.", explicacion: "No bloquea al usuario; marca hasta cuándo vale el código." }
    ],
    correcta: 2
  },
  {
    pregunta: "La consulta de la versión 1 busca el código así. ¿Qué le falta para que no sirvan códigos viejos ni usados?",
    codigo: "SELECT c.id FROM codigos_recuperacion c JOIN usuarios u ON u.id = c.usuario_id\n WHERE c.version = 1 AND u.email = ? AND c.codigo = ?",
    opciones: [
      { texto: "AND c.estado = 'activo' AND c.expira_en > NOW()", explicacion: "Es lo que agrega la versión 2: solo el código vigente." },
      { texto: "ORDER BY c.id", explicacion: "Ordenar no descarta códigos viejos." },
      { texto: "LIMIT 100", explicacion: "Limitar filas no tiene relación con el vencimiento." },
      { texto: "Nada; ya está bien.", explicacion: "Acepta cualquier código que alguna vez se creó (CP-05 y CP-06)." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué pasa si en la versión 2 se borra esta línea, que se ejecuta cuando el código es correcto?",
    codigo: "$pdo->prepare(\"UPDATE codigos_recuperacion SET estado = 'usado' WHERE id = ?\")...",
    opciones: [
      { texto: "El código deja de vencer.", explicacion: "El vencimiento depende de expira_en, no de esta línea." },
      { texto: "El mismo código se puede volver a usar mientras no venza.", explicacion: "Sin marcarlo como usado, vuelve a aparecer como activo (CP-05)." },
      { texto: "No se puede cambiar la contraseña.", explicacion: "El cambio sigue funcionando; el problema es el reuso." },
      { texto: "Se envía un correo de aviso.", explicacion: "Esta línea no envía correos." }
    ],
    correcta: 1
  },
  {
    pregunta: "Con este control (MAX_INTENTOS = 5), el atacante escribe 5 códigos incorrectos y después el correcto. ¿Qué pasa?",
    codigo: "if ($_SESSION['rec_intentos'] >= MAX_INTENTOS) {\n    $mensaje = $mensaje_limite;\n} elseif ($fila && password_verify($codigo, $fila['codigo'])) {\n    // correcto\n}",
    opciones: [
      { texto: "Acepta el correcto.", explicacion: "El primer if se cumple antes de llegar a password_verify." },
      { texto: "Le da 5 intentos más.", explicacion: "No hay intentos extra." },
      { texto: "Cambia la contraseña de todas formas.", explicacion: "Nunca llega a la parte que deja cambiarla." },
      { texto: "Muestra el mensaje de límite y rechaza el correcto; el código queda bloqueado.", explicacion: "Es lo que se observó en CP-04." }
    ],
    correcta: 3
  },
  {
    pregunta: "En la versión 1, ¿qué permite esta línea de nueva_clave.php?",
    codigo: "// FALLA 7\n$email = $_GET['email'] ?? '';\n...\nUPDATE usuarios SET password_hash = ? ... WHERE email = ?",
    opciones: [
      { texto: "Nada; el usuario ya verificó su código.", explicacion: "Verificó SU código, pero la cuenta sale de la URL, que puede cambiar." },
      { texto: "Que se guarde la contraseña en texto plano.", explicacion: "Se guarda un hash; el problema es a qué cuenta." },
      { texto: "Que Carlos verifique su código, cambie ?email= por el de Laura y le cambie la contraseña a Laura.", explicacion: "Es el caso CP-07: Carlos terminó entrando como Laura." },
      { texto: "Que se pidan códigos sin límite.", explicacion: "Eso es en recuperar.php, no aquí." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Por qué esta línea de la versión 2 evita el ataque de CP-07?",
    codigo: "$usuario = buscar_usuario_por_id($_SESSION['rec_usuario_id']);",
    opciones: [
      { texto: "Porque rec_usuario_id lo guardó el servidor al verificar el código y el usuario no puede editar $_SESSION.", explicacion: "La URL se puede cambiar; la sesión vive en el servidor." },
      { texto: "Porque buscar por id es más rápido.", explicacion: "La velocidad no tiene que ver con la seguridad." },
      { texto: "Porque el id está cifrado en la URL.", explicacion: "No viaja en la URL; está en la sesión." },
      { texto: "Porque bloquea a Carlos.", explicacion: "No lo bloquea; simplemente le cambia la clave a él y no a Laura." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cuál de estas líneas es la versión vulnerable para decidir a qué cuenta cambiarle la contraseña?",
    opciones: [
      { texto: "$usuario = buscar_usuario_por_id($_SESSION['rec_usuario_id']);", explicacion: "Es la versión protegida: la cuenta sale de la sesión." },
      { texto: "if (isset($_SESSION['rec_usuario_id']) && time() <= $_SESSION['rec_vence'])", explicacion: "Es un control de la versión protegida." },
      { texto: "$email = $_GET['email'] ?? '';", explicacion: "Toma la cuenta de la URL, que el usuario puede cambiar." },
      { texto: "unset($_SESSION['rec_usuario_id'], $_SESSION['rec_vence']);", explicacion: "Borra el permiso después de usarlo; es de la versión protegida." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué controla esta parte de recuperar.php (versión 2)?",
    codigo: "if (solicitudes_recientes('email', $email) >= MAX_SOLICITUDES) {\n    registrar('solicitud_rechazada', $email, 'Superó el límite ... por correo');\n} elseif (solicitudes_recientes('ip', ip_cliente()) >= MAX_SOLICITUDES_IP) {\n    registrar('solicitud_rechazada', $email, 'Superó el límite ... por IP');\n}",
    opciones: [
      { texto: "Los intentos de código incorrecto.", explicacion: "Eso se controla en verificar.php." },
      { texto: "Cuántos códigos se pueden pedir: 3 por correo y 10 por IP cada 15 minutos.", explicacion: "Evita inundar de correos al usuario (CP-09)." },
      { texto: "El largo de la contraseña nueva.", explicacion: "Eso lo hace revisar_clave_nueva." },
      { texto: "Si el correo existe.", explicacion: "Se cuenta igual exista o no la cuenta." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué pasa si se borra esta línea al final de nueva_clave.php (versión 2)?",
    codigo: "unset($_SESSION['rec_usuario_id'], $_SESSION['rec_vence']);",
    opciones: [
      { texto: "La contraseña no se cambia.", explicacion: "El cambio ya se hizo antes de esta línea." },
      { texto: "Se envía el aviso dos veces.", explicacion: "Esta línea no envía correos." },
      { texto: "El código vuelve a estar activo.", explicacion: "El código ya se marcó como usado en verificar.php." },
      { texto: "El permiso de cambio sigue en la sesión y se podría volver a cambiar la clave sin un código nuevo (mientras no venza).", explicacion: "Por eso el permiso se borra: sirve una sola vez." }
    ],
    correcta: 3
  },
  {
    pregunta: "El sistema tiene este JavaScript en el campo del código. ¿Protege contra alguien que quiere adivinar códigos?",
    codigo: "// js/app.js\ncampoCodigo.addEventListener('input', () => {\n    campoCodigo.value = campoCodigo.value.replace(/\\D/g, '');  // solo números\n});",
    opciones: [
      { texto: "Sí, porque no deja escribir letras.", explicacion: "Eso solo pasa en el navegador, que el atacante controla." },
      { texto: "Sí, porque el JavaScript corre en el servidor.", explicacion: "Este JavaScript corre en el navegador." },
      { texto: "No: solo ayuda al usuario. El atacante puede desactivarlo o enviar pedidos directo; los controles van en PHP.", explicacion: "Lo que corre en el navegador se puede modificar." },
      { texto: "No, porque falta un exit.", explicacion: "exit es de PHP; no tiene relación." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Por qué la versión 2 responde con esta frase, exista o no la cuenta?",
    codigo: "avisar('Si el correo está registrado, te enviamos un código de 6 números. ...', 'info');",
    opciones: [
      { texto: "Para no revelar qué correos tienen cuenta.", explicacion: "Con la misma respuesta siempre, no se puede enumerar (CP-03)." },
      { texto: "Porque el sistema no sabe si el correo existe.", explicacion: "Lo sabe; decide no decirlo." },
      { texto: "Para ahorrar correos.", explicacion: "No tiene relación con la cantidad de correos." },
      { texto: "Porque el correo es simulado.", explicacion: "Sería igual con correo real." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué contra de los límites de solicitudes reconoce el informe?",
    opciones: [
      { texto: "Que hacen más lento el login.", explicacion: "Los límites son de la recuperación, no del login." },
      { texto: "Que permiten adivinar el código.", explicacion: "Al contrario: ayudan a que no se adivine." },
      { texto: "Que guardan el código en texto plano.", explicacion: "La versión 2 guarda solo el hash." },
      { texto: "Que alguien puede pedir códigos a nombre de otro y dejarlo esperando, y el límite por IP afecta a quienes comparten red.", explicacion: "Es una molestia (denegación de servicio) que el grupo señala como limitación." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué requisitos pide la versión 2 para la contraseña nueva?",
    opciones: [
      { texto: "Al menos 8 caracteres con mayúscula, número y símbolo.", explicacion: "El grupo siguió a NIST, que no impone reglas de composición." },
      { texto: "Entre 15 y 64 caracteres y que no sea una contraseña común.", explicacion: "Por eso “123456” se rechazó en CP-10." },
      { texto: "Exactamente 6 números.", explicacion: "Eso es el código de recuperación, no la contraseña." },
      { texto: "Ninguno.", explicacion: "Ninguno era la versión 1, que aceptó “123456”." }
    ],
    correcta: 1
  }
];
