const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
var config         = require('../config');

gulp.task('loadBlogContent', function(cb) {
  let blogContent = {};

  return gulp.src(config.src.blog +'/*.json')
    .on('data', function(file) {
      let fileName = path.basename(file.path);
      let fileContent = JSON.parse(fs.readFileSync(file.path, 'utf8'));
      blogContent[fileName] = fileContent;
	  
	  if(blogContent[fileName].link=="") 
	  {
	  	blogContent[fileName].link = fileName.replace(/\.json$/g, ".html");
	  }
      
	  let regex = /\n/g;
	  let replacedText = blogContent[fileName].body.replace(regex, "\\n");
	  
	  blogContent[fileName].body = replacedText;
	  
    })
    .on('end', function() {
      console.log('Loaded blog content:', blogContent);
	  fs.writeFileSync(config.src.decapDatafile, JSON.stringify(blogContent, null, 2));
	       console.log('Saved blog content to '+ config.src.decapDatafile);
    });
	cb();
});

gulp.task('transformData', function(cb) {
  let blogContent = JSON.parse(fs.readFileSync(config.src.decapDatafile, 'utf8'));
        
		
	  const sortedPosts = Object.entries(blogContent)
	    .sort(([keyA, postA], [keyB, postB]) => new Date(postB.date) - new Date(postA.date))
	    .reduce((acc, [key, post]) => ({ ...acc, [key]: post }), {});
		
		
  let transformedContent = `{% set list = [${Object.values(sortedPosts).map(JSON.stringify).join(',\n')}] %}`;

  fs.writeFileSync(config.src.njDatafile, transformedContent);
  console.log('Transformed data saved to' + config.src.njDatafile);
  cb();
});


let build =  function(gulp) {
    return gulp.series('loadBlogContent','transformData');
};

module.exports.build = build;