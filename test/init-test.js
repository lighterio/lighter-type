'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type.init', function () {
  var Adder = Type.extend({
    init: function (name) {
      this.name = name
    },
    add: function (a, b) {
      return a + b
    }
  })

  var AsyncAdder = Type.extend({
    init: function (name) {
      this.name = name
      this.isAsync = true
    },
    add: function (a, b, fn) {
      fn(undefined, a + b)
    }
  })

  it('gives prototype methods to a plain object', function () {
    var calculator = {}
    Adder.init(calculator)
    var three = calculator.add(1, 2)
    is(three, 3)
  })

  it('leaves existing methods alone if not told to overwrite', function () {
    var asyncAdder = new AsyncAdder()
    Adder.init(asyncAdder)
    var noReturnValue = asyncAdder.add(1, 2, function () {})
    is.undefined(noReturnValue)
  })

  it('overwrites existing methods if told to', function () {
    var adder = new AsyncAdder()
    Adder.init(adder, true)
    var three = adder.add(1, 2)
    is(three, 3)
  })

  it('accepts arguments', function () {
    var adder = new AsyncAdder()
    Adder.init(adder, ['me'])
    is(adder.name, 'me')
  })

  it('skips the constructor if arguments is false', function () {
    var calculator = {}
    Adder.init(calculator, false, false)
    is.function(calculator.add)
    is.undefined(calculator.name)
  })
})
