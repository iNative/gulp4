const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
var config         = require('../config');

gulp.task('generateDataFiles', function (done) {
  const contentPath = config.src.decapDatafile;
  const templatePath = config.src.postTemplate;
  const dataDirectory = config.src.njDataDir;

  const blogContent = JSON.parse(fs.readFileSync(contentPath));

  Object.keys(blogContent).forEach((postName) => {
    const postData = blogContent[postName];
    const dataFileName = postName.replace('.json', '') + '.html';
    const dataFilePath = path.join(dataDirectory, dataFileName);
    const templateData = `{% set list = [${JSON.stringify(postData)}] %}`;

    fs.writeFileSync(dataFilePath, templateData);

    const newTemplatePath = path.join(config.src.templates, postName.replace('.json', '') + '.html');
    const postTemplate = fs.readFileSync(templatePath, 'utf8');
    const updatedTemplate = postTemplate.replace('data.html', dataFileName);

    fs.writeFileSync(newTemplatePath, updatedTemplate);
  });
  done();
});
let build =  function(gulp) {
    return gulp.parallel('generateDataFiles');
};

module.exports.build = build;