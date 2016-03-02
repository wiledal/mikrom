var gulp = require("gulp"),
    include = require("gulp-include"),
    watch = require("gulp-watch"),
    colors = require("colors"),
    browserSync = require("browser-sync");


function notifyError(error) {
  console.log(" - There was an error compiling:".red);
  console.log(error.messageFormatted);
  
  var weHaveAProblem = [
    "Something went terribly wrong.",
    "Something broke, big time.",
    "You killed it, you bastard, you actually killed it.",
    "Everytime the code breaks, a kitten loses its wings."
  ];
  
  notifier.notify({
    title: "[GULP] We have a problem",
    icon: "https://lh3.googleusercontent.com/E6EO3XO6zP7NtBq2L9SDF1DbBoYamUWc8QTRvOFuQg_Gka2Vw_RIv-AjU5Ysu4XgwHU=w170",
    message: weHaveAProblem[Math.floor(Math.random() * weHaveAProblem.length)] + " Check the console please."
  })
}


gulp.task("build-js", function() {
  console.log(" -- Compiling ".green + "js ".cyan + new Date());
  gulp.src("src/**/*.js")
    .pipe(include())
    .on("error", notifyError)
    .pipe(gulp.dest("dist"));
  
  browserSync.reload();
});

gulp.task("serve", ["watch"], function() {
  browserSync.init({
    server: {
      baseDir: ".",
      directory: true
    }
  });
});

gulp.task("watch", function() {
  watch("src/**/*", function() {
    gulp.start("build-js");
  });
  watch("examples/**/*", function() {
    browserSync.reload();
  })
});

 console.log("Señor Gulpfile".rainbow)