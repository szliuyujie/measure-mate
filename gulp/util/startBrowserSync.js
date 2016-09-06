var _ = require('lodash')
var assign = require('lodash.assign')
var browserSync = require('browser-sync')
var gutil = require('gulp-util')
var config = require('../config')

var bsConfig = config.browserSync.all
if (config.browserSyncDebug) {
  _.assign(bsConfig, config.browserSync.debug)
}
var mode = config.browserSyncMode + 'Options'
assign(bsConfig, config.browserSync[mode])

var startBrowserSync = function () {
  if (global.isBuilding === true) {
    gutil.log('Build in progress...')
    setTimeout(startBrowserSync, 100)
  } else {
    gutil.log('Build complete, starting BrowserSync')
    browserSync(bsConfig)
  }
}

module.exports = startBrowserSync
