document.addEventListener('DOMContentLoaded', () => {
    iniciarApp()
});

function iniciarApp() {
    crearGaleria()
};

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