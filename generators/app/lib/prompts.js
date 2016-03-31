'use strict';

module.exports = function prompts(instance) {
  const prompts = [];

  prompts.push({
    name: 'appName',
    message: 'The project shall be named:',
    default: instance.appname
  });

  prompts.push({
    name: 'author',
    message: 'Project author:',
    default: 'James Sumners <james.sumners@gmail.com>'
  });

  prompts.push({
    name: 'description',
    message: 'Project description:',
    default: ''
  });
  
  prompts.push({
    name: 'keywords',
    message: 'Keywords:',
    default: [],
    validate: (input) => {
      if (input.length === 0) {
        return true;
      }
      if (input.indexOf(' ') > -1) {
        return false;
      }
      // just assume it's either a single keyword or comma separated
      return true;
    },
    filter: (input) => {
      return (input.length > 0) ? input.split(',') : input;
    }
  });

  prompts.push({
    type: 'confirm',
    name: 'addGit',
    message: 'Add git repo information:',
    default: true,
    filter: (input) => input.toLowerCase() === 'y'
  });
  
  prompts.push({
    name: 'gitUrl',
    message: 'Git URL:',
    default: `https://github.com/jsumners/${instance.appname}.git`,
    when: (answers) => answers.addGit
  });

  prompts.push({
    name: 'mainFile',
    message: 'The main source file shall be named:',
    default: 'index.js'
  });

  prompts.push({
    type: 'confirm',
    name: 'ideaProject',
    message: 'Create IntelliJ IDEA project files:',
    default: true,
    filter: (input) => input.toLowerCase() === 'y'
  });
  
  return prompts;
};