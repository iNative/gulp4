var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'build';

var config = {
    env       : 'development',
    production: production,

    src: {
		pages        : 'src/pages',
        root         : 'src',
        templates    : 'src/templates',
        templatesData: 'src/templates/data',
        pagelist     : 'src/index.yaml',
        sass         : 'src/sass',
		blog         : 'content/blog',
		content         : 'content',
        // path for sass files that will be generated automatically via some of tasks
        sassGen      : 'src/sass/generated',
        js           : 'assets/js',
        img          : 'assets',
        svg          : 'src/img/svg',
        icons        : 'src/icons',
        // path to png sources for sprite:png task
        iconsPng     : 'src/icons',
        // path to svg sources for sprite:svg task
        iconsSvg     : 'src/icons',
        // path to svg sources for iconfont task
        iconsFont    : 'src/icons',
        fonts        : 'src/fonts',
        lib          : 'src/lib',
		// decap and nunjucks blog config
		njDatafile       : 'src/templates/data/data.html',
		decapDatafile : 'content/blogContent.json',
        njDataDir         : 'src/templates/data',
		postTemplate : 'src/templates/post.html'
    },
    dest: {
        root : destPath,
        html : destPath,
        css  : destPath + '/assets/css',
        js   : destPath + '/assets/js',
        img  : destPath + '/assets',
        fonts: destPath + '/assets/fonts',
        lib  : destPath + '/lib',
        data : destPath + '/data'
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
