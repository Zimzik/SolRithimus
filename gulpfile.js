'use strict';

const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  path = require('path'),
  less = require('gulp-less'),
  gcmq = require('gulp-group-css-media-queries'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpIf = require('gulp-if'),
  del = require('del'),
  plumber = require('gulp-plumber'),
  webpack = require('gulp-webpack'),
  nodemon = require('gulp-nodemon');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('less', function() {
  return gulp.src('front-end/main-page/less/styles.less')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(less())
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('./public/main-page/css'))
    .pipe(browserSync.stream());
});

gulp.task('webpack', function(){
	return gulp.src('./front-end/main-page/js/script.js')
		.pipe(webpack( require('./front-end/wpconfig/webpackConfigMain/webpack.config.js') ))
		.pipe(gulp.dest('./public/main-page/js'))
		.pipe(browserSync.stream());
});


gulp.task('clean', function() {
  return del('./public/main-page');
});

gulp.task('copy', function() {
  return gulp.src(['front-end/main-page/{fonts,img,libs,video}/**/*', 'front-end/main-page/index.html'], {base: 'front-end/main-page', since: gulp.lastRun('copy')})
      .pipe(gulp.dest('./public/main-page'))
      .pipe(browserSync.stream());
});  

gulp.task('build', gulp.series('clean', gulp.parallel('copy','less','webpack')));

gulp.task('serve', function() {
  gulp.watch('./front-end/main-page/less/**/*.*', gulp.series('less'));
  gulp.watch('./front-end/main-page/js/**/*.*', gulp.series('webpack'));
  gulp.watch(['front-end/main-page/fonts', 'front-end/main-page/img', 'front-end/main-page/libs','front-end/main-page/video', 'front-end/main-page/index.html'], gulp.series('copy'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('serve')));

//for Admin panel

gulp.task('adm:less', function () {
  return gulp.src('front-end/admin-panel/less/styles.less')
    .pipe(less())
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/admin-panel/css'))
    .pipe(browserSync.stream());
});

gulp.task('adm:clean', function() {
  return del('./public/admin-panel');
});

gulp.task('adm:copy', function () {
  return gulp.src(['front-end/admin-panel/{fonts,img,libs}/**/*', 'front-end/admin-panel/index.html'], {base: 'front-end/admin-panel', since: gulp.lastRun('adm:copy')})
    .pipe(gulp.dest('./public/admin-panel'))
    .pipe(browserSync.stream());
});

gulp.task('adm:webpack', function(){
  return gulp.src('./front-end/admin-panel/js/script.js')
    .pipe(webpack( require('./front-end/wpconfig/webpackConfigAdmin/webpack.config.js') ))
    .pipe(gulp.dest('./public/admin-panel/js'))
    .pipe(browserSync.stream());
});

gulp.task('adm:serve', function() {
  gulp.watch('./front-end/admin-panel/less/**/*.*', gulp.series('adm:less'));
  gulp.watch('./front-end/admin-panel/js/**/*.*', gulp.series('adm:webpack'));
  gulp.watch(['front-end/admin-panel/fonts', 'front-end/admin-panel/img', 'front-end/admin-panel/libs', 'front-end/admin-panel/index.html'], gulp.series('adm:copy'));
});

gulp.task('adm:build', gulp.series('adm:clean', gulp.parallel('adm:copy','adm:less','adm:webpack')));

gulp.task('adm:dev', gulp.series('adm:build', gulp.parallel('adm:serve')));

//-------------

function someNodemon(cb) {
  let started = false;

  return nodemon({
    script: 'server.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
};

function browsersync() {
  browserSync.init(null, {
    proxy: "http://localhost:5000",
    files: ['./public/main-page','./public/admin-panel'],
    port: 7000,
  });
}

gulp.task('default', gulp.series(gulp.parallel('build', 'adm:build'), gulp.parallel('serve','adm:serve',gulp.series(someNodemon,browsersync))));


