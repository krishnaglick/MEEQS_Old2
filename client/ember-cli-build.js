/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  var semanticFontSettings = { destDir: 'assets/themes/default/assets/fonts' };
  var semanticDirectory = '/semantic-ui/dist/';

  app.import(app.bowerDirectory + semanticDirectory + 'semantic.js');
  app.import(app.bowerDirectory + semanticDirectory + 'semantic.css');
  app.import(app.bowerDirectory + semanticDirectory + 'themes/default/assets/fonts/icons.woff2', semanticFontSettings);
  app.import(app.bowerDirectory + semanticDirectory + 'themes/default/assets/fonts/icons.woff', semanticFontSettings);
  app.import(app.bowerDirectory + semanticDirectory + 'themes/default/assets/fonts/icons.ttf', semanticFontSettings);

  return app.toTree();
};
