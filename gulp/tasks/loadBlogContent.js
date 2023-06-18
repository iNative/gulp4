const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
var config         = require('../config');

gulp.task('loadBlogContent', function(cb) {
  let blogContent = {};

  return gulp.src('content/blog/*.json')
    .on('data', function(file) {
      let fileName = path.basename(file.path);
      let fileContent = JSON.parse(fs.readFileSync(file.path, 'utf8'));
      blogContent[fileName] = fileContent;
      blogContent[fileName].link = fileName.replace(/\.json$/g, ".html");
    })
    .on('end', function() {
      console.log('Loaded blog content:', blogContent);
	  fs.writeFileSync('content/blogContent.json', JSON.stringify(blogContent, null, 2));
	       console.log('Saved blog content to content/blogContent.json');
    });
	cb();
});

gulp.task('transformData', function(cb) {
  let blogContent = JSON.parse(fs.readFileSync('content/blogContent.json', 'utf8'));
  let transformedContent = `{% set list = [${Object.values(blogContent).map(JSON.stringify).join(',\n')}] %}`;

  fs.writeFileSync('src/templates/data/data.html', transformedContent);
  console.log('Transformed data saved to src/templates/data/data.html');
  cb();
});


let build =  function(gulp) {
    return gulp.series('loadBlogContent','transformData');
};

module.exports.build = build;