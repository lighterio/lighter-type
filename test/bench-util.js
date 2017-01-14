'use strict'
var fns = exports.fns = {}

load('augment')
load('klass')
load('modelo')
load('type')
load('util')
load('es6')

function load (key) {
  try {
    var fn = require(__dirname + '/alternatives/' + key)
    fns[key] = fn
  } catch (ignore) {
    console.log(ignore)
  }
}
