module.exports = function(grunt) {
  var templatesRoot = './public/js/views/templates/',
    templatesExt = '.hbs',
    templateOutputLocation = templatesRoot,
    templatesFile = 'templates.js';
  grunt.initConfig({
    watch: {
      handlebars: {
        files: [templatesRoot + '**/*' + templatesExt],
        tasks: ['handlebars:compile']
      }
    },
    handlebars: {
      compile: {
        src: templatesRoot + '**/*' + templatesExt,
        dest: templateOutputLocation + templatesFile,
        options: {
          amd: true,
          namespace: 'templates',
          processName: function(filePath) {
            return filePath.replace(/^\.\/public\/js\/views\/templates\//, '').replace(/\.hbs$/, '');
          }
        }
      }
    },
    nodemon: {
      dev: {
        script: './bin/www'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('auto', ['loopmocha']);
};