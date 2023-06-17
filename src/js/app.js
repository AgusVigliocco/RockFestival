document.addEventListener('DOMContentLoaded', () => {
    iniciarApp()
});

function iniciarApp() {
    navegacionFija()
    scrollNav()
    crearGaleria()
};


function navegacionFija() {
    const barra = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')
    const body = document.querySelector('body')

    window.addEventListener('scroll', () => {

        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo')
            barra.classList.add('body-scroll')
        } else {
            barra.classList.remove('fijo')
            barra.classList.remove('body-scroll')
        }
    })

}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {


            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture')
        imagen.innerHTML = `
        
        <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria" />
        
        `
        imagen.onclick = () => {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen)

    }
}

function mostrarImagen(id) {

    const imagen = document.createElement('picture')

    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif" />
    <source srcset="build/img/grande/${id}.webp" type="image/webp" />
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria" />
    
    `
    //crear el overlay con la imagen
    const overlay = document.createElement('DIV')
    overlay.appendChild(imagen)
    overlay.classList.add('overlay')
    overlay.onclick = () => {
        const body = document.querySelector('body')
        body.classList.remove('fijar-body')
        overlay.remove()
    }

    //boton para cerrar el modal
    const cerrarModal = document.createElement('P')
    cerrarModal.textContent = 'X'
    cerrarModal.classList.add('btn-cerrar')
    overlay.appendChild(cerrarModal)

    cerrarModal.onclick = () => {
        const body = document.querySelector('body')
        body.classList.remove('fijar-body')
        overlay.remove()
    }
    //añadiro al HTML
    const body = document.querySelector('body')
    body.appendChild(overlay)
    body.classList.add('fijar-body')
}