const autoprefixer = require('autoprefixer');
const assets  = require('postcss-assets');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const csso = require('postcss-csso');
const concat = require('gulp-concat');
const env = require('gulp-env');
const eslint = require('gulp-eslint');
const glob = require("glob");
const gulp = require('gulp');
const gulpif = require('gulp-if');
const mustache = require("gulp-mustache");
const nested = require('postcss-nested');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const reporter  = require('postcss-reporter');
const rename = require("gulp-rename");
const rulesScripts = require('./eslintrc.json');
const rulesStyles = require('./stylelintrc.json');
const stylelint = require('stylelint');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const paths = {
    src: {
        dir: 'source',
        fonts: 'source/fonts/**/*',
        styles: 'source/**/*css',
        scripts: 'source/**/*js',
        templates: 'source/templates/**/*.mustache',
        imgInline: 'source/img/inline/**/*',
        imgInsert: 'source/img/insert/**/*',
        icon: 'source/*.ico'
    },
    build: {
        styles: 'build',
        scripts: 'build',
        dir: 'build',
        img: 'build/img',
        fonts: 'build/fonts',
    },
    targetNames: {
        html: 'index.html',
        styles: 'style.min.css',
        scripts: 'script.min.js',
    },
    lint: {
        scripts: ['**/*.js', '!node_modules/**/*', '!build/**/*'],
        styles: ['**/*.css', '!node_modules/**/*', '!build/**/*']
    }
};

env({
    file: '.env',
    type: 'ini',
});

gulp.task('clean', () => {
    return gulp.src(['build/*', '!build/fonts'], {read: false})
    .pipe(clean());
});

gulp.task('compile', () => {
    return gulp.src(`${paths.src.dir}/index.mustache`)
    .pipe(mustache('source/templates/json.mustache', {}, {} ))
    .pipe(rename(paths.targetNames.html))
    .pipe(gulp.dest(paths.build.dir));
});

gulp.task('css', () => {
    const plugins = [
        autoprefixer(),
        postcssPresetEnv(),
        nested(),
        assets({
          loadPaths: ['source/img/**/*'],
        })
    ];

    return gulp.src([paths.src.styles])
    .pipe(sourcemaps.init())
    .pipe(concat(paths.targetNames.styles))
    .pipe(postcss(plugins))
    .pipe(gulpif( process.env.NODE_ENV === 'prod', postcss([csso]) ))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build.styles));
});

gulp.task('js', () => {
    return gulp.src(paths.src.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.targetNames.scripts))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulpif( process.env.NODE_ENV === 'prod', uglify() ))
    .pipe( sourcemaps.write() )
    .pipe(gulp.dest(paths.build.scripts));
});

gulp.task('assets_img', (done) => {
    glob(paths.src.imgInsert, (err, files) => {
        if (!err) {
            return gulp.src(files)
            .pipe(gulp.dest('build/img'));
        } else {
            throw err;
        }
    });
    done();
});

gulp.task('assets_icon', (done) => {
    glob(paths.src.icon, (err, files) => {
        if (!err) {
            return gulp.src(files)
                .pipe(gulp.dest('build'));
        } else {
            throw err;
        }
    });
    done();
});

gulp.task('assets', gulp.parallel('assets_img', 'assets_icon'));

gulp.task('eslint', () => {
    return gulp.src(paths.lint.scripts)
        .pipe( eslint(rulesScripts) )
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('stylelint', () => {
    return gulp.src(paths.lint.styles)
    .pipe(postcss([
        stylelint(rulesStyles),
        reporter({
            clearMessages: true,
            throwError: true
        })
    ]));
});

gulp.task('lint', gulp.parallel('stylelint', 'eslint'));

gulp.task('default', gulp.series('lint', 'clean', gulp.parallel('compile', 'css', 'assets', 'js') ) );

gulp.task('watch', () => {
    gulp.watch(paths.src.dir, gulp.series('default'));

});
