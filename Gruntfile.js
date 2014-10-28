module.exports = function(grunt) {

  aws_data = grunt.file.readJSON('aws.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    broccoli_build: {
      assets: {
        dest: 'dist/'
      }
    },
    env: {
      doop: {
        src: 'env.json'
      }
    },
    aws_s3: {
      options: {
        accessKeyId: aws_data.accessKeyId,
        secretAccessKey: aws_data.secretAccessKey
      },
      sync: {
        options: {
          bucket: aws_data.bucket,
          differential: true,
          access: 'public-read'
        },
        files: [
          {expand: true, cwd: 'dist/', src: '**', dest: 'resume/'},
          {dest: aws_data.prefix, cwd: 'dist/', action: 'delete'}
        ]
        
      }
    },
    clean: ['dist']
  });

  grunt.loadNpmTasks('grunt-broccoli-build');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean', 'broccoli_build']);
  grunt.registerTask('deploy', ['build', 'aws_s3:sync']);

  // console.log(JSON.stringify(process.env, 1, 2));
  // process.abort();

  // grunt.registerTask('dev', ['env:dev', 'lint', 'server', 'watch']);
  // grunt.registerTask('build', ['env:build', 'lint', 'other:build:tasks']);
};
