// Build "NGN Chassis Showroom"
'use strict'

// Dependencies ----------------------------------------------------------------
var gulp = require('gulp')
var sass = require('gulp-sass')
var del = require('del')
// var livereload = require('gulp-livereload')
var path = require('path')
var fs = require('fs')

// Sass Paths ------------------------------------------------------------------
var SHOWROOM = {
  SASS: path.resolve('./showroom/sass/**/*.s*ss'),
  INCLUDE: path.resolve('./src')
}

var DEST = './showroom'

// Sass ------------------------------------------------------------------------
gulp.task('sasscompile', function () {
  return gulp.src([SHOWROOM.SASS])
    .pipe(
      sass({
        includePaths: SHOWROOM.INCLUDE
      })
    ).on('error', sass.logError)
    .pipe(gulp.dest(DEST + '/stylesheets'))
})

// Cleanup ---------------------------------------------------------------------
gulp.task('clean', function (next) {
  fs.exists(DEST + '/stylesheets', function (exists) {
    exists && del.sync(DEST + '/stylesheets')
    next()
  })
})

// Build -----------------------------------------------------------------------
gulp.task('build', ['clean', 'sasscompile'])

// Watch -----------------------------------------------------------------------
gulp.task('watch', function () {
  gulp.watch(SHOWROOM.SASS, ['clean', 'sasscompile'])
})

// Dev -------------------------------------------------------------------------
gulp.task('dev', ['build', 'watch'])
