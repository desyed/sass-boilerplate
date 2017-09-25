/* Needed gulp config */

var gulp = require('gulp');  
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
var imageminGiflossy = require('imagemin-giflossy');
var del = require('del');

/* Setup mode configaration
 * prod: false ==== development mode
 * prod: true  ==== production mode
 * */
var config = {
    prod: false
};


/* clean app folder */

gulp.task('clean', function () {
    del([
        'app/*'
    ]);
});

/* Scripts task */
gulp.task('scripts', function() {
    if(!config.prod){
        return gulp.src([
            /* Add your JS files here, they will be combined in this order */
            'src/vendor/js/jquery.min.js',
            'src/vendor/js/*.js',

        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'));
    }else{
        return gulp.src([
            /* Add your JS files here, they will be combined in this order */
            'src/vendor/js/jquery.min.js',
            'src/vendor/js/*.js',

        ])
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('app/js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('app/js'));
    }

});

gulp.task('minify-custom', function() {
    if(!config.prod){
        console.log('Custom.js is in Development mode!')
        return gulp.src([
            /* Add your JS files here, they will be combined in this order */
            'src/js/custom.js'
        ])
            .pipe(rename({suffix: '.min'}))
            // .pipe(uglify())
            .pipe(gulp.dest('app/js'));
    }else{
        return gulp.src([
            /* Add your JS files here, they will be combined in this order */
            'src/js/custom.js'
        ])
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('app/js'));
    }

});

/* Sass task */
gulp.task('sass', function () {  
    if(!config.prod){
       return gulp.src('src/scss/style.scss')
            .pipe(plumber())
            .pipe(sass({
                errLogToConsole: true,

                //outputStyle: 'compressed',
                // outputStyle: 'compact',
                // outputStyle: 'nested',
                outputStyle: 'expanded',
                precision: 10
            }))

            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('app/css'))

            .pipe(rename({suffix: '.min'}))
            // .pipe(minifycss())
            .pipe(gulp.dest('app/css'))
            /* Reload the browser CSS after every change */
            .pipe(browserSync.reload({stream:true}));
    }else{
       return gulp.src('src/scss/style.scss')
            .pipe(plumber())
            .pipe(sass({
                errLogToConsole: true,

                //outputStyle: 'compressed',
                // outputStyle: 'compact',
                // outputStyle: 'nested',
                outputStyle: 'expanded',
                precision: 10
            }))

            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('app/css'))

            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('app/css'))
            /* Reload the browser CSS after every change */
            .pipe(browserSync.reload({stream:true}));
    }
});

gulp.task('merge-styles', function () {

    return gulp.src([
        'src/vendor/css/*.css',
        
        ])
        // .pipe(sourcemaps.init())
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        .pipe(concat('styles-merged.css'))
        .pipe(gulp.dest('app/css'))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream:true}));
})

/* image optimization*/

gulp.task('images', function () {
     return gulp.src('src/img/*')
            .pipe(imagemin(
                [
                    //png
                    imageminPngquant({
                        speed: 1,
                        quality: 98 //lossy settings
                    }),
                    imageminZopfli({
                        more: true
                    }),
                    //gif
                    // imagemin.gifsicle({
                    //     interlaced: true,
                    //     optimizationLevel: 3
                    // }),
                    //gif very light lossy, use only one of gifsicle or Giflossy
                    imageminGiflossy({
                        optimizationLevel: 3,
                        optimize: 3, //keep-empty: Preserve empty transparent frames
                        lossy: 2
                    }),
                    //svg
                    imagemin.svgo({
                        plugins: [{
                            removeViewBox: false
                        }]
                    }),
                    //jpg lossless
                    imagemin.jpegtran({
                        progressive: true
                    }),
                    //jpg very light lossy, use vs jpegtran
                    imageminMozjpeg({
                        quality: 90
                    })
                ]
            ))
            .pipe(gulp.dest('app/images'))
});

/* html from src to app */

gulp.task('rander-view', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream:true}));
});


/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['app/css/*.css', 'app/js/*.js'], {
        
        // proxy: 'localhost/boilerplate/app'
        /* For a static server you would use this: */

        server: {
            baseDir: './app',
            index: 'index.html'
        }

    });
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'scripts','minify-custom','rander-view', 'browser-sync', 'merge-styles','images'], function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['src/scss/style.scss','src/scss/**/*.scss'], ['sass'])
    /* Watch app.js file, run the scripts task on change. */
    gulp.watch(['src/js/custom.js'], ['minify-custom'])
	gulp.watch(['src/img/*'], ['images']);
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['src/index.html'], ['rander-view']);
	
});