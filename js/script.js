document.addEventListener('DOMContentLoaded', function () {

  const navbar = document.querySelector('.navbar');
  const encabezado = document.querySelector('.encabezado');

  if (navbar && encabezado) {
    const botonMenu = document.createElement('button');
    botonMenu.type = 'button';
    botonMenu.className = 'menu-toggle';
    botonMenu.textContent = '☰ Menú';
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-controls', 'menu-principal');

    navbar.id = 'menu-principal';
    encabezado.insertAdjacentElement('afterend', botonMenu);

    botonMenu.addEventListener('click', function () {
      const abierto = navbar.classList.toggle('abierto');
      botonMenu.setAttribute('aria-expanded', String(abierto));
      botonMenu.textContent = abierto ? '✕ Cerrar' : '☰ Menú';
    });
  }

  const botonArriba = document.createElement('button');
  botonArriba.type = 'button';
  botonArriba.className = 'volver-arriba';
  botonArriba.textContent = '↑';
  botonArriba.setAttribute('aria-label', 'Volver arriba');
  document.body.appendChild(botonArriba);

  window.addEventListener('scroll', function () {
    botonArriba.classList.toggle('visible', window.scrollY > 300);
  });

  botonArriba.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.querySelectorAll('main h2').forEach(function (titulo, indice) {
    const elementos = [];
    let siguiente = titulo.nextElementSibling;

    while (siguiente && siguiente.tagName !== 'H2') {
      elementos.push(siguiente);
      siguiente = siguiente.nextElementSibling;
    }

    if (elementos.length === 0) return;

    const panel = document.createElement('div');
    panel.className = 'panel-seccion';
    panel.id = 'seccion-' + indice;
    elementos.forEach(function (el) { panel.appendChild(el); });
    titulo.insertAdjacentElement('afterend', panel);

    titulo.classList.add('acordeon');

    function alternar() {
      const visible = panel.classList.toggle('oculto') === false;
      titulo.setAttribute('aria-expanded', String(visible));
    }

    titulo.addEventListener('click', alternar);
    titulo.addEventListener('keydown', function (evento) {
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        alternar();
      }
    });
  });

});