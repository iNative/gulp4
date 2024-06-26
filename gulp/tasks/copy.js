var gulp = require('gulp');
var config = require('../config.js');

gulp.task('copy:img', function () {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,js,woff,woff2}',
            '!' + config.src.img + '/video/*.*'
        ])
        .pipe(gulp.dest(config.dest.img));
});


gulp.task('copy:admin', function () {
    return gulp
        .src('src/templates/admin/config.yml')
        .pipe(gulp.dest('build/admin'));
});
gulp.task('copy:fonts', function () {
    return gulp
        .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:data', function () {
    return gulp
        .src(config.src.data + '/**/*.*')
        .pipe(gulp.dest(config.dest.data));
});

gulp.task('copy:lib', function () {
    return gulp
        .src(config.src.lib + '/**/*.*')
        .pipe(gulp.dest(config.dest.lib));
});

gulp.task('copy:rootfiles', function () {
    return gulp
        .src(config.src.root + '/*.*')
        .pipe(gulp.dest(config.dest.root));
});


let build =  function(gulp) {
    return gulp.parallel('copy:img', 'copy:fonts','copy:admin');
};

let watch =  function(gulp) {
    return function(){
        return gulp.watch(config.src.img + '/*', gulp.parallel('copy:img', 'copy:fonts'));
    }
};



module.exports.build = build;
module.exports.watch = watch;