'use strict'
var fns = exports.fns = {}
var dir = __dirname

load('augment')
load('klass')
load('modelo')
load('lighter-type')
load('util')
load('es6.class')

function load (key) {
  try {
    var fn = require(dir + '/alternatives/' + key)
    fns[key] = fn
  } catch (error) {
    console.log(error)
  }
}
