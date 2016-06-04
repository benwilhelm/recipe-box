var gulp       = require("gulp");
var concat     = require("gulp-concat");
var browserify = require("browserify");
var babelify   = require('babelify');
var source     = require("vinyl-source-stream");

gulp.task("vendor:css", function(){
  gulp.src([
    "./src/bower_components/bootstrap/dist/css/bootstrap.min.css"
  ])
  .pipe(concat("vendor.css"))
  .pipe(gulp.dest("./dist/"))
})

gulp.task("build:js", function(){
  return browserify("./src/app.react.js")
         .transform(babelify, { presets: ["es2015", "react"] })
         .bundle()
         .pipe(source('app.js'))
         .pipe(gulp.dest("./dist/"))
});

gulp.task("default", function() {
  gulp.watch("src/**/*.js", ["build:js"])
})
