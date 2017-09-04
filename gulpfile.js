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
  return gulp.src('public/main-page/app/less/styles.less')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(less())
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('./public/main-page/dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('webpack', function(){
	return gulp.src('public/main-page/app/js/script.js')
		.pipe(webpack( require('./config/webpackConfigMain/webpack.config.js') ))
		.pipe(gulp.dest('./public/main-page/dist/js'))
		.pipe(browserSync.stream());
});


gulp.task('clean', function() {
  return del('public/main-page/dist');
});

gulp.task('copy', function() {
  return gulp.src(['public/main-page/app/{fonts,img,libs,video}/**/*', 'public/main-page/app/index.html'], {base: 'public/main-page/app', since: gulp.lastRun('copy')})
      .pipe(gulp.dest('./public/main-page/dist'))
      .pipe(browserSync.stream());
});  

gulp.task('build', gulp.series('clean', gulp.parallel('copy','less','webpack')));

gulp.task('serve', function() {
  gulp.watch('./public/main-page/app/less/**/*.*', gulp.series('less'));
  gulp.watch('./public/main-page/app/js/**/*.*', gulp.series('webpack'));
  gulp.watch(['public/main-page/app/fonts', 'public/main-page/app/img', 'public/main-page/app/libs','public/main-page/app/video', 'public/main-page/app/index.html'], gulp.series('copy'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('serve')));

//for Admin panel

gulp.task('adm:less', function () {
  return gulp.src('public/admin-panel/app/less/styles.less')
    .pipe(less())
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/admin-panel/dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('adm:clean', function() {
  return del('public/admin-panel/dist');
});

gulp.task('adm:copy', function () {
  return gulp.src(['public/admin-panel/app/{fonts,img,libs}/**/*', 'public/admin-panel/app/index.html'], {base: 'public/admin-panel/app', since: gulp.lastRun('adm:copy')})
    .pipe(gulp.dest('./public/admin-panel/dist'))
    .pipe(browserSync.stream());
});

gulp.task('adm:webpack', function(){
  return gulp.src('public/admin-panel/app/js/script.js')
    .pipe(webpack( require('./config/webpackConfigAdmin/webpack.config.js') ))
    .pipe(gulp.dest('./public/admin-panel/dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('adm:serve', function() {
  gulp.watch('./public/admin-panel/app/less/**/*.*', gulp.series('adm:less'));
  gulp.watch('./public/admin-panel/app/src/**/*.*', gulp.series('adm:webpack'));
  gulp.watch(['public/admin-panel/app/fonts', 'public/admin-panel/app/img', 'public/admin-panel/app/libs', 'public/admin-panel/app/index.html'], gulp.series('adm:copy'));
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
    files: ['./public/main-page/dist','./public/admin-panel/dist'],
    port: 7000,
  });
}

gulp.task('default', gulp.series(gulp.parallel('build', 'adm:build'), gulp.parallel('serve','adm:serve',someNodemon,browsersync)));


