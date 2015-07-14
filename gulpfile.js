var gulp = require("gulp")
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");
    
gulp.task("default", function() {
  gulp.src("src/mikrom.js")
    .pipe(gulp.dest("dist/"));
  
  gulp.src("src/mikrom.js")
    .pipe(uglify({
      preserveComments: "all"
    }))
    .pipe(rename("mikrom.min.js"))
    .pipe(gulp.dest("dist/"));
});