var gulp = require("gulp")
    uglify = require("gulp-uglify");
    
gulp.task("default", function() {
  gulp.src("src/mikrom.js")
    .pipe(uglify({
      preserveComments: "all"
    }))
    .pipe(gulp.dest("dist/"));
});