var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var jade = require('broccoli-jade');
var stylus = require('broccoli-stylus');
var autoprefixer = require('broccoli-autoprefixer');
var cleanCSS = require('broccoli-clean-css');
var htmlmin = require('broccoli-htmlmin');

var rootPath = 'src';
var outputPath = 'dist';

var jadeTemplates = pickFiles(rootPath, {
  srcDir: '/',
  files: ['**/*.jade'],
  destDir: '/' 
});

var stylusStyles = pickFiles(rootPath, {
  srcDir: '/',
  files: ['**/*.styl'],
  destDir: '/'
});


var html = jade(jadeTemplates);
// var html = htmlmin(html);

var styles = stylus(stylusStyles);
var styles = autoprefixer(styles);
// var styles = cleanCSS(styles);

module.exports = mergeTrees([html, styles]);
