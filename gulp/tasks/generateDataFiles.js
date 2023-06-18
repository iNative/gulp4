const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

gulp.task('generateDataFiles', function (done) {
  const contentPath = 'content/blogContent.json';
  const templatePath = 'src/templates/post.html';
  const dataDirectory = 'src/templates/data';

  const blogContent = JSON.parse(fs.readFileSync(contentPath));

  Object.keys(blogContent).forEach((postName) => {
    const postData = blogContent[postName];
    const dataFileName = postName.replace('.json', '') + '.html';
    const dataFilePath = path.join(dataDirectory, dataFileName);
    const templateData = `{% set list = [${JSON.stringify(postData)}] %}`;

    fs.writeFileSync(dataFilePath, templateData);

    const newTemplatePath = path.join('src/templates', postName.replace('.json', '') + '.html');
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