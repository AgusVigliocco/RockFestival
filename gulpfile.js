const { src, dest, watch, parallel } = require('gulp');

//! CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')

//! JAVASCRIPT
const terser = require('gulp-terser-js')


//! IMAGENES
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const avif = require('gulp-avif')

//! FUNCIONES
function css(done) {
    src('src/scss/**/*.scss') // identificar el archivo de SASS
        .pipe(plumber())
        .pipe(sass()) // lo compila
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('build/css')); // lo almacena en el HDD

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


function javaScript(done) {
    src('src/js/**/*.js')
        .pipe(terser())
        .pipe(dest('build/js'))

    done()
}




function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javaScript);

    done();
}


exports.css = css;
exports.js = javaScript
exports.imagenes = imagenes
exports.versionAvif = versionAvif;
exports.imagenes = imagenes
exports.dev = parallel(versionAvif, imagenes, versionWebp, javaScript, dev);
