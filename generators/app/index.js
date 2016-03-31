'use strict';

const util = require('util');
const yeoman = require('yeoman-generator');

function MorhynGenerator() {
  yeoman.Base.apply(this, arguments);
}
util.inherits(MorhynGenerator, yeoman.Base);

MorhynGenerator.prototype.end = function end() {
  this.log('Done!');
};

MorhynGenerator.prototype.configuring = function configuring() {
  const done = this.async();

  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore');
  this.copy('eslintrc.js', '.eslintrc.js');
  this.copy('gulpfile.js');
  this.directory('test');

  done();
};

MorhynGenerator.prototype.install = function install() {
  const done = this.async();

  this.log('Installing dev dependencies...');
  this.npmInstall(
    [
      'mocha', 'chai',
      'eslint', 'eslint-plugin-standard', 'eslint-plugin-promise',
      'gulp', 'gulp-load-plugins', 'gulp-eslint', 'gulp-mocha'
    ],
    {saveDev: true}
  );

  done();
};

MorhynGenerator.prototype.prompting = function prompting() {
  const done = this.async();
  const prompts = require('./lib/prompts')(this);

  this.prompt(prompts, (answers) => {
    for (let k of Object.keys(answers)) {
      this[k] = answers[k];
    }
    done();
  });
};

MorhynGenerator.prototype.writing = function writing() {
  const done = this.async();
  this.template('index.js', this.mainFile);
  this.template('package.json');

  if (this.ideaProject) {
    this.template('project.iml', `${this.appName}.iml`);
    this.directory('idea', '.idea');
  }
  
  done();
};

module.exports = MorhynGenerator;