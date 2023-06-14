const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber')


function css(done) {

    src("src/scss/**/*.scss") // identificar el archivo de SASS
        .pipe(plumber())
        .pipe(sass()) // lo compila
        .pipe(dest("build/css"));// lo almacena en el HDD


    done();
}

function dev(done) {

    watch("src/scss/**/*.scss", css)

    done()
}

exports.css = css
exports.dev = dev