const { src, dest, watch, parallel } = require("gulp");

//! CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//! IMAGENES
const webp = require("gulp-webp");
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const avif = require('gulp-avif')

//! FUNCIONES
function css(done) {
    src("src/scss/**/*.scss") // identificar el archivo de SASS
        .pipe(plumber())
        .pipe(sass()) // lo compila
        .pipe(dest("build/css")); // lo almacena en el HDD

    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);

    done();
}

function versionWebp(done) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'))

    done();
}


function imagenes(done) {
    const options = {
        optimizationLevel: 3,
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img'))

    done()
}

function versionAvif(done) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(options))
        .pipe(dest('build/img'))

    done();
}



exports.css = css;
exports.imagenes = imagenes
exports.versionAvif = versionAvif;
exports.imagenes = imagenes
exports.dev = parallel(versionAvif, imagenes, versionWebp, dev);
