var gulp = require("gulp");
var include = require("gulp-include");
var watch = require("gulp-watch");
var colors = require("colors");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require('gulp-babel');

function notifyError(error) {
  console.log(" - There was an error compiling:".red);
  console.log(error.stack);
}


gulp.task("build-js", () => {
  console.log(" -- Compiling ".green + "js ".cyan + new Date());
  gulp.src("src/**/*.js")
    .pipe(include())
    .pipe(babel({
      presets: ['es2015']
    }))
      .on("error", notifyError)
    .pipe(gulp.dest("dist"));

  gulp.src("src/**/*.js")
    .pipe(include())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({
      preserveComments: "all"
    }))
    .pipe(rename((path) => {
      path.extname = ".min.js"
    }))
      .on("error", notifyError)
    .pipe(gulp.dest("dist"));

});

gulp.task("watch", () => {
  watch("src/**/*", function() {
    gulp.start("build-js");
  });
});

gulp.task("default", ["build-js"]);

 console.log("Señor Gulpfile".rainbow)
