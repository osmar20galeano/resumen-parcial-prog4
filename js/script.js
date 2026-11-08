// Funciones comunes: botón imprimir, índice activo y motor de los exámenes

// Temas del examen final: nombre del banco de preguntas, título y página para repasar
const TEMAS = [
  { banco: "preguntas1", nombre: "Variables de sesión", enlace: "modulo1_sesiones.html" },
  { banco: "preguntas2", nombre: "Almacenamiento seguro de contraseñas", enlace: "modulo2_contrasenas.html" },
  { banco: "preguntas3", nombre: "Fuerza bruta", enlace: "modulo3_fuerza_bruta.html" },
  { banco: "preguntas4", nombre: "Recuperación segura de contraseñas", enlace: "modulo4_recuperacion.html" },
  { banco: "preguntas5", nombre: "Inyección de scripts (XSS)", enlace: "modulo5_xss.html" },
  { banco: "preguntas_final", nombre: "Preguntas que combinan temas", enlace: "" }
];
const POR_TEMA = 5; // preguntas al azar de cada módulo en el examen final

document.addEventListener("DOMContentLoaded", function () {
  // Botones "Imprimir o guardar PDF"
  document.querySelectorAll(".boton-imprimir").forEach(function (boton) {
    boton.addEventListener("click", function () { window.print(); });
  });

  marcarIndiceActivo();

  // Examen de un módulo: <div id="examen" data-banco="preguntas1">
  const contenedor = document.getElementById("examen");
  if (contenedor && Array.isArray(window[contenedor.dataset.banco])) {
    iniciarExamenModulo(contenedor, window[contenedor.dataset.banco]);
  }

  // Examen final: <div id="examen-final">
  const final = document.getElementById("examen-final");
  if (final) iniciarExamenFinal(final);
});

// Resalta en el índice lateral la sección que se está leyendo
function marcarIndiceActivo() {
  const enlaces = document.querySelectorAll("nav.indice a[href^='#']");
  if (!enlaces.length || !("IntersectionObserver" in window)) return;
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      enlaces.forEach(function (a) {
        a.classList.toggle("activo", a.getAttribute("href") === "#" + entrada.target.id);
      });
    });
  }, { rootMargin: "0px 0px -70% 0px" });
  enlaces.forEach(function (a) {
    const seccion = document.getElementById(a.getAttribute("href").slice(1));
    if (seccion) observador.observe(seccion);
  });
}

// Devuelve una copia mezclada (Fisher-Yates)
function mezclar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const aux = copia[i];
    copia[i] = copia[j];
    copia[j] = aux;
  }
  return copia;
}

// Arma una pregunta lista para mostrar, con las opciones marcadas y quizás mezcladas
function prepararItem(p, conMezcla, tema) {
  let opciones = p.opciones.map(function (o, i) {
    return { texto: o.texto, explicacion: o.explicacion, esCorrecta: i === p.correcta };
  });
  if (conMezcla) opciones = mezclar(opciones);
  return { original: p, tema: tema, pregunta: p.pregunta, codigo: p.codigo, opciones: opciones, acerto: null };
}

// Crea un elemento con texto (siempre textContent, nunca innerHTML)
function crear(etiqueta, clase, texto) {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

// Examen de un módulo: primero en orden; "Volver a empezar" mezcla preguntas y opciones
function iniciarExamenModulo(contenedor, banco) {
  motorExamen(contenedor, {
    armar: function (modo) {
      const base = modo === "inicial" ? banco : mezclar(banco);
      return base.map(function (p) { return prepararItem(p, modo !== "inicial", null); });
    },
    botones: [{ texto: "Volver a empezar", modo: "mezclar" }],
    resumen: function (items, aciertos) {
      const porcentaje = Math.round((aciertos / items.length) * 100);
      return [crear("p", "", "Resultado final: " + aciertos + " de " + items.length + " correctas (" + porcentaje + " %). " +
        (porcentaje >= 70 ? "Buen nivel; repasá las que fallaste." : "Conviene repasar la teoría, el código explicado y las trampas, y repetir el examen."))];
    }
  });
}

// Examen final: 5 al azar de cada módulo + todas las combinadas, mezcladas
function iniciarExamenFinal(contenedor) {
  let ultimaRonda = [];
  motorExamen(contenedor, {
    armar: function (modo) {
      let lista = [];
      if (modo === "falladas") {
        lista = ultimaRonda.filter(function (it) { return it.acerto === false; })
          .map(function (it) { return prepararItem(it.original, true, it.tema); });
      } else {
        TEMAS.forEach(function (tema) {
          const banco = window[tema.banco];
          if (!Array.isArray(banco)) return;
          const elegidas = tema.banco === "preguntas_final" ? banco : mezclar(banco).slice(0, POR_TEMA);
          elegidas.forEach(function (p) { lista.push(prepararItem(p, true, tema)); });
        });
      }
      ultimaRonda = mezclar(lista);
      return ultimaRonda;
    },
    botones: [
      { texto: "Repasar las que fallé", modo: "falladas", soloSiHayFalladas: true },
      { texto: "Nuevo examen", modo: "nuevo" }
    ],
    resumen: function (items, aciertos) {
      const porcentaje = Math.round((aciertos / items.length) * 100);
      const nota = crear("p", "", "Nota: " + aciertos + " de " + items.length + " correctas (" + porcentaje + " %).");
      const tabla = crear("table", "tabla-temas");
      const cabeza = crear("tr");
      ["Tema", "Aciertos", "Repasar"].forEach(function (t) { cabeza.append(crear("th", "", t)); });
      const thead = crear("thead");
      thead.append(cabeza);
      const tbody = crear("tbody");
      TEMAS.forEach(function (tema) {
        const delTema = items.filter(function (it) { return it.tema === tema; });
        if (!delTema.length) return;
        const bien = delTema.filter(function (it) { return it.acerto; }).length;
        const fila = crear("tr");
        fila.append(crear("td", "", tema.nombre), crear("td", "", bien + " de " + delTema.length));
        const celda = crear("td");
        if (tema.enlace) {
          const a = crear("a", "", "Ir al módulo");
          a.href = tema.enlace;
          celda.append(a);
        } else {
          celda.textContent = "—";
        }
        fila.append(celda);
        tbody.append(fila);
      });
      tabla.append(thead, tbody);
      const envoltura = crear("div", "tabla-contenedor");
      envoltura.append(tabla);
      const falladas = items.length - aciertos;
      const pie = crear("p", "chico", falladas ? "Fallaste " + falladas + ": con “Repasar las que fallé” se repiten solo esas." : "No fallaste ninguna.");
      return [nota, envoltura, pie];
    }
  });
}

// Motor común: dibuja las preguntas, corrige al hacer clic y muestra el resultado
function motorExamen(contenedor, config) {
  const letras = ["A", "B", "C", "D", "E"];
  let items = [];
  let aciertos = 0;
  let respondidas = 0;

  const marcador = crear("div", "marcador");
  const lista = crear("ol", "lista-preguntas");
  const resultado = crear("div", "resultado-final");
  const zonaBotones = crear("div", "botones-examen");
  const botones = config.botones.map(function (b) {
    const boton = crear("button", "", b.texto);
    boton.type = "button";
    boton.addEventListener("click", function () {
      dibujar(b.modo);
      contenedor.scrollIntoView();
    });
    zonaBotones.append(boton);
    return { boton: boton, datos: b };
  });

  contenedor.textContent = "";
  contenedor.append(marcador, lista, resultado, zonaBotones);

  function actualizar() {
    marcador.textContent = "Respondidas: " + respondidas + " de " + items.length + " · Aciertos: " + aciertos;
    const terminado = items.length > 0 && respondidas === items.length;
    resultado.textContent = "";
    if (terminado) resultado.append.apply(resultado, config.resumen(items, aciertos));
    resultado.hidden = !terminado;
    // "Repasar las que fallé" solo se habilita al terminar y si hubo errores
    botones.forEach(function (b) {
      if (b.datos.soloSiHayFalladas) b.boton.disabled = !terminado || aciertos === items.length;
    });
  }

  // Muestra la devolución al elegir una opción
  function responder(item, botonesOpcion, elegida, caja) {
    botonesOpcion.forEach(function (b) { b.disabled = true; });
    const indiceCorrecta = item.opciones.findIndex(function (o) { return o.esCorrecta; });
    const opcion = item.opciones[elegida];
    respondidas++;
    item.acerto = opcion.esCorrecta;
    caja.textContent = "";

    if (opcion.esCorrecta) {
      aciertos++;
      botonesOpcion[elegida].classList.add("correcta");
      caja.className = "devolucion bien";
      caja.append(crear("p", "rotulo", "Correcto."), crear("p", "", opcion.explicacion));
    } else {
      botonesOpcion[elegida].classList.add("incorrecta");
      botonesOpcion[indiceCorrecta].classList.add("correcta");
      caja.className = "devolucion mal";
      caja.append(
        crear("p", "rotulo", "Incorrecto. Elegiste la " + letras[elegida] + "."),
        crear("p", "", "Por qué está mal: " + opcion.explicacion),
        crear("p", "rotulo", "La correcta es la " + letras[indiceCorrecta] + "."),
        crear("p", "", "Por qué está bien: " + item.opciones[indiceCorrecta].explicacion)
      );
    }
    caja.hidden = false;
    actualizar();
  }

  function dibujar(modo) {
    items = config.armar(modo);
    aciertos = 0;
    respondidas = 0;
    lista.textContent = "";
    items.forEach(function (item, n) {
      const li = crear("li", "pregunta");
      const enunciado = crear("p", "enunciado");
      enunciado.append(crear("span", "", (n + 1) + "."), document.createTextNode(item.pregunta));
      li.append(enunciado);
      if (item.codigo) {
        const pre = crear("pre");
        pre.append(crear("code", "", item.codigo));
        li.append(pre);
      }
      const caja = crear("div", "opciones");
      const devolucion = crear("div", "devolucion");
      devolucion.hidden = true;
      const botonesOpcion = item.opciones.map(function (o, i) {
        const b = crear("button", "opcion");
        b.type = "button";
        b.append(crear("span", "letra", letras[i] + ")"), document.createTextNode(o.texto));
        b.addEventListener("click", function () { responder(item, botonesOpcion, i, devolucion); });
        caja.append(b);
        return b;
      });
      li.append(caja, devolucion);
      lista.append(li);
    });
    actualizar();
  }

  dibujar("inicial");
}
