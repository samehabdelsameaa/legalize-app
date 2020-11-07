var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rev  = require('gulp-rev');
    
gulp.task('sass', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'));
});


gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']); 
