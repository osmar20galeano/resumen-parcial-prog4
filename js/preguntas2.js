// Preguntas del examen del módulo 2: almacenamiento seguro de contraseñas
// var (no const) para que el motor lo encuentre por su nombre en window
var preguntas2 = [
  {
    pregunta: "¿Qué técnica corresponde usar para guardar contraseñas?",
    opciones: [
      { texto: "Codificación con Base64.", explicacion: "Base64 lo revierte cualquiera, sin clave." },
      { texto: "Cifrado con AES.", explicacion: "Se revierte con la clave; si la clave se filtra, salen todas las contraseñas." },
      { texto: "Un hash lento con sal, como bcrypt o Argon2id.", explicacion: "Es de un solo sentido y, con sal y costo, frena al atacante." },
      { texto: "Texto plano en una columna oculta.", explicacion: "Ocultar la columna no sirve: quien copia la base la ve igual." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cuál es la diferencia principal entre cifrado y hash?",
    opciones: [
      { texto: "El cifrado se revierte con la clave; el hash no se revierte.", explicacion: "Por eso el hash es lo adecuado para contraseñas." },
      { texto: "El hash se revierte con la sal; el cifrado no.", explicacion: "La sal no sirve para revertir el hash; ningún dato lo revierte." },
      { texto: "Son lo mismo con distinto nombre.", explicacion: "Son técnicas distintas: una es reversible y la otra no." },
      { texto: "El cifrado es más lento que cualquier hash.", explicacion: "La velocidad no es la diferencia; hay hashes rápidos (MD5) y lentos (bcrypt)." }
    ],
    correcta: 0
  },
  {
    pregunta: "Un sistema guarda la contraseña así. ¿Qué técnica es y protege la clave?",
    codigo: "$claveGuardada = base64_encode(\"hola1234\");\n// en la base queda: aG9sYTEyMzQ=",
    opciones: [
      { texto: "Es un hash; la clave queda protegida.", explicacion: "Base64 no es un hash: se puede revertir." },
      { texto: "Es cifrado; solo se lee con la clave del servidor.", explicacion: "Base64 no usa ninguna clave." },
      { texto: "Es un hash con sal.", explicacion: "No hay hash ni sal; es solo otra forma de escribir el mismo dato." },
      { texto: "Es codificación; cualquiera la revierte con base64_decode y lee hola1234.", explicacion: "La codificación solo cambia la forma de escribir; no protege nada." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Qué problema tiene esta línea de php/usuarios.php (versión vulnerable)?",
    codigo: "$claveGuardada = $clave;",
    opciones: [
      { texto: "Ninguno; así se guarda bien.", explicacion: "Así la contraseña queda legible en la base." },
      { texto: "Guarda la contraseña en texto plano: si se filtra la base, se leen todas.", explicacion: "Es la debilidad que estudió el grupo." },
      { texto: "Guarda un hash sin sal.", explicacion: "No calcula ningún hash; copia la contraseña tal cual." },
      { texto: "Cifra la contraseña con una clave débil.", explicacion: "No hay cifrado; es una simple copia." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué indica ['cost' => 12] en esta línea?",
    codigo: "$claveHash = password_hash($clave, PASSWORD_BCRYPT, ['cost' => 12]);",
    opciones: [
      { texto: "Que la contraseña debe tener 12 caracteres.", explicacion: "El costo no tiene que ver con el largo de la contraseña." },
      { texto: "Que el hash mide 12 caracteres.", explicacion: "El hash bcrypt mide 60 caracteres." },
      { texto: "El costo del cálculo: lo hace lento a propósito y cada punto más duplica el tiempo.", explicacion: "Así cada intento de adivinar cuesta tiempo (unos 0,23 s en el equipo del grupo)." },
      { texto: "Que el usuario tiene 12 intentos antes de bloquearse.", explicacion: "Limitar intentos es otro tema (fuerza bruta)." }
    ],
    correcta: 2
  },
  {
    pregunta: "En la base aparece este valor en usu_clave. ¿Qué significa $2y$12$?",
    codigo: "$2y$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW",
    opciones: [
      { texto: "Que la contraseña tiene 12 caracteres y empieza con 2y.", explicacion: "Esos datos no dicen nada de la contraseña." },
      { texto: "Que fue cifrada con AES de 12 bits.", explicacion: "No es cifrado; es un hash bcrypt." },
      { texto: "Que es el usuario número 12.", explicacion: "El hash no guarda el ID del usuario." },
      { texto: "Que el algoritmo es bcrypt (2y) y el costo es 12; después vienen la sal y el hash.", explicacion: "Por eso password_verify no necesita ningún dato extra." }
    ],
    correcta: 3
  },
  {
    pregunta: "Se ejecutan estas dos líneas con la misma contraseña. ¿Por qué dan resultados distintos?",
    codigo: "echo password_hash(\"hola123\", PASSWORD_BCRYPT);\necho password_hash(\"hola123\", PASSWORD_BCRYPT);",
    opciones: [
      { texto: "Porque cada llamada genera una sal aleatoria nueva.", explicacion: "Por eso en P1 carlos y laura, con la misma clave, quedaron con hashes distintos." },
      { texto: "Porque bcrypt tiene un error.", explicacion: "No es un error; es lo que se busca." },
      { texto: "Porque el costo cambia solo en cada llamada.", explicacion: "El costo es el mismo en las dos." },
      { texto: "Porque PHP agrega la fecha y hora al hash.", explicacion: "No se agrega la fecha; la diferencia la pone la sal." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué función va en el hueco de php/acceso.php (versión protegida)?",
    codigo: "} elseif (______________($clave, $fila['usu_clave'])) {\n    // contraseña correcta",
    opciones: [
      { texto: "password_hash", explicacion: "password_hash calcula un hash nuevo; no compara." },
      { texto: "password_verify", explicacion: "Recalcula con la sal y el costo guardados y devuelve true o false." },
      { texto: "md5", explicacion: "md5 no compara y además no sirve para contraseñas." },
      { texto: "base64_decode", explicacion: "No se puede decodificar un hash; no es codificación." }
    ],
    correcta: 1
  },
  {
    pregunta: "Alguien escribió así la verificación. ¿Qué pasa al iniciar sesión con la clave correcta?",
    codigo: "if (password_hash($clave, PASSWORD_BCRYPT) === $fila['usu_clave']) {\n    // entra\n}",
    opciones: [
      { texto: "Entra normalmente.", explicacion: "El hash nuevo tiene otra sal, así que nunca es igual al guardado." },
      { texto: "Entra solo si el costo es 12.", explicacion: "Aunque el costo coincida, la sal es distinta." },
      { texto: "Nunca entra, porque cada password_hash usa una sal nueva y el resultado no coincide.", explicacion: "Para comparar hay que usar password_verify." },
      { texto: "PHP muestra un error de sintaxis.", explicacion: "La sintaxis es válida; el error es de lógica." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué exige esta comparación de la versión vulnerable para funcionar?",
    codigo: "} elseif ($clave === $fila['usu_clave']) {",
    opciones: [
      { texto: "Que la columna tenga un hash bcrypt.", explicacion: "Contra un hash nunca coincidiría." },
      { texto: "Que la sesión esté iniciada.", explicacion: "La comparación no depende de la sesión." },
      { texto: "Que la clave esté cifrada con AES.", explicacion: "Compararía el texto escrito con el cifrado y no coincidiría." },
      { texto: "Que la base tenga la contraseña en texto plano.", explicacion: "Compara texto con texto; por eso la vulnerable guarda la clave tal cual." }
    ],
    correcta: 3
  },
  {
    pregunta: "En la prueba P5 el atacante pega el hash robado en el campo contraseña. ¿Qué responde la versión protegida?",
    codigo: "// el atacante escribe: $2y$12$R9h/cIPz0gi.URNNX3kh2O...\npassword_verify($clave, $fila['usu_clave']);",
    opciones: [
      { texto: "Clave incorrecta: calcula el hash del texto pegado y no coincide con el guardado.", explicacion: "El hash de un hash no es igual al hash de la contraseña real." },
      { texto: "Deja entrar, porque el texto pegado es igual al guardado.", explicacion: "password_verify no compara textos directamente." },
      { texto: "Muestra la contraseña original.", explicacion: "El hash no se puede revertir." },
      { texto: "Bloquea la cuenta para siempre.", explicacion: "No hay bloqueo; simplemente rechaza el intento." }
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué hace esta condición dentro del login protegido?",
    codigo: "if (password_needs_rehash($fila['usu_clave'], PASSWORD_BCRYPT, ['cost' => 12])) {\n    // se vuelve a calcular el hash con el costo actual\n}",
    opciones: [
      { texto: "Verifica si la contraseña es correcta.", explicacion: "Eso lo hace password_verify, antes de esta condición." },
      { texto: "Indica si el hash guardado usa otro algoritmo o costo y conviene recalcularlo.", explicacion: "Así se puede subir el costo con el tiempo, cuando el usuario entra." },
      { texto: "Cambia la contraseña del usuario por una nueva.", explicacion: "La contraseña no cambia; solo se recalcula su hash." },
      { texto: "Borra el hash si es demasiado viejo.", explicacion: "No borra nada; solo devuelve true o false." }
    ],
    correcta: 1
  },
  {
    pregunta: "¿Por qué esta forma de guardar no es adecuada?",
    codigo: "$claveGuardada = md5($clave);",
    opciones: [
      { texto: "Porque MD5 se puede decodificar como Base64.", explicacion: "MD5 es un hash, no una codificación; el problema es otro." },
      { texto: "Porque MD5 cifra con una clave fija.", explicacion: "MD5 no usa clave." },
      { texto: "Porque el resultado ocupa demasiado espacio.", explicacion: "El tamaño no es el problema." },
      { texto: "Porque MD5 es rápido y aquí no lleva sal: permite millones de intentos por segundo.", explicacion: "El grupo midió unos 6 millones por segundo con MD5, contra unos 4 con bcrypt." }
    ],
    correcta: 3
  },
  {
    pregunta: "La tabla tiene esta columna. ¿Qué pasa al guardar un hash bcrypt?",
    codigo: "CREATE TABLE usuarios (\n  usu_nombre VARCHAR(50),\n  usu_clave  VARCHAR(30)\n);",
    opciones: [
      { texto: "Nada; el hash entra en 30 caracteres.", explicacion: "El hash bcrypt mide 60 caracteres." },
      { texto: "El hash de 60 caracteres no entra: se corta o da error, y el login deja de funcionar.", explicacion: "El manual de PHP recomienda VARCHAR(255)." },
      { texto: "MySQL agranda la columna solo.", explicacion: "MySQL no cambia el tamaño de la columna por su cuenta." },
      { texto: "Se guarda solo la sal.", explicacion: "No se separa nada: se guarda el texto cortado o da error." }
    ],
    correcta: 1
  },
  {
    pregunta: "Un sistema cifra las contraseñas así. ¿Cuál es el riesgo principal?",
    codigo: "$clave_aes = \"MiClaveSecreta\"; // en config.php\n$guardada = openssl_encrypt($clave, \"aes-256-cbc\", $clave_aes, 0, $iv);",
    opciones: [
      { texto: "Que el cifrado es demasiado lento para el usuario.", explicacion: "El cifrado es rápido; la lentitud no es el problema." },
      { texto: "Ninguno; es tan seguro como bcrypt.", explicacion: "No: el cifrado es reversible." },
      { texto: "Si se filtra la clave de config.php, se descifran todas las contraseñas de una vez.", explicacion: "Por eso para contraseñas se usa un hash, que no se revierte." },
      { texto: "Que dos usuarios con la misma clave quedan bloqueados.", explicacion: "No hay ningún bloqueo." }
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué demostró la prueba P5 en la versión vulnerable?",
    opciones: [
      { texto: "Que el valor copiado de la base era la contraseña real de laura y permitió entrar.", explicacion: "En la protegida, el mismo intento fue rechazado." },
      { texto: "Que bcrypt tardaba 0,23 s.", explicacion: "Eso fue la prueba P8." },
      { texto: "Que el cierre de sesión no funcionaba.", explicacion: "El cierre funcionó igual en las dos (P6)." },
      { texto: "Que la base no se podía leer.", explicacion: "En la vulnerable la base se leía completa." }
    ],
    correcta: 0
  },
  {
    pregunta: "Según el informe, ¿qué NO logra el hash de contraseñas?",
    opciones: [
      { texto: "Que dos claves iguales queden con hashes distintos.", explicacion: "Eso sí lo logra, gracias a la sal." },
      { texto: "Que el hash robado no sirva para entrar.", explicacion: "Eso sí lo logra (P5)." },
      { texto: "Que adivinar cada clave sea lento.", explicacion: "Eso sí lo logra, gracias al costo." },
      { texto: "Impedir que roben la base, ni proteger una clave débil como 123456.", explicacion: "El hash reduce el daño, pero una clave débil igual se adivina con tiempo." }
    ],
    correcta: 3
  },
  {
    pregunta: "¿Cuál es la versión protegida para guardar la contraseña?",
    opciones: [
      { texto: "$claveGuardada = $clave;", explicacion: "Es texto plano: la versión vulnerable." },
      { texto: "$claveGuardada = sha1($clave);", explicacion: "SHA-1 es rápido y aquí no lleva sal." },
      { texto: "$claveHash = password_hash($clave, PASSWORD_BCRYPT, ['cost' => 12]);", explicacion: "Hash bcrypt con sal automática y costo 12, como en el informe." },
      { texto: "$claveGuardada = base64_encode($clave);", explicacion: "Es codificación; se revierte sin clave." }
    ],
    correcta: 2
    },
  {
    pregunta: "¿Qué muestra este código?",
    codigo: "$hash = password_hash(\"hola123\", PASSWORD_BCRYPT, ['cost' => 12]);\nvar_dump(password_verify(\"hola123\", $hash));\nvar_dump(password_verify(\"Hola123\", $hash));",
    opciones: [
      { texto: "bool(false) y bool(false), porque el hash tiene otra sal.", explicacion: "password_verify toma la sal del propio hash; con la clave correcta da true." },
      { texto: "bool(true) y bool(true), porque mayúsculas y minúsculas dan igual.", explicacion: "Las contraseñas distinguen mayúsculas: Hola123 es otra clave." },
      { texto: "bool(true) y bool(false): la primera clave es la correcta y la segunda es otra.", explicacion: "password_verify devuelve true solo si la clave escrita corresponde al hash." },
      { texto: "La contraseña original \"hola123\".", explicacion: "password_verify no revela la clave; solo devuelve true o false." }
    ],
    correcta: 2
  },
  {
    pregunta: "Según el informe, ¿qué límite tiene bcrypt?",
    opciones: [
      { texto: "Solo acepta contraseñas de 12 caracteres.", explicacion: "El 12 del informe es el costo, no un largo." },
      { texto: "Solo tiene en cuenta los primeros 72 bytes de la contraseña.", explicacion: "Lo que venga después de los 72 bytes no cambia el hash." },
      { texto: "No funciona en PHP 8.", explicacion: "El grupo lo usó en PHP 8 sin problemas." },
      { texto: "Se puede revertir si se conoce la sal.", explicacion: "La sal no es secreta y no sirve para revertir el hash." }
    ],
    correcta: 1
  }
];
