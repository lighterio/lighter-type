'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type.is', function () {
  it('returns true for itself', function () {
    var Blah = Type.extend({})
    is.true(Blah.is(Blah))
  })

  it('returns false for an unrelated Type', function () {
    var Beep = Type.extend({})
    var Boop = Type.extend({})
    is.false(Beep.is(Boop))
  })

  it('returns false for unrelated stuff', function () {
    var Beep = Type.extend({})
    is.false(Beep.is())
    is.false(Beep.is(undefined))
    is.false(Beep.is(null))
    is.false(Beep.is(true))
    is.false(Beep.is(1))
    is.false(Beep.is('a'))
    is.false(Beep.is(is))
    is.false(Beep.is({}))
    is.false(Beep.is([]))
  })

  it('returns true for ancestors', function () {
    var Foo = Type.extend({})
    var Bar = Foo.extend({})
    var Baz = Bar.extend({})
    is.true(Baz.is(Bar))
    is.true(Baz.is(Foo))
    is.true(Baz.is(Type))
  })

  it('returns false for descendents', function () {
    var Foo = Type.extend({})
    var Bar = Foo.extend({})
    var Baz = Bar.extend({})
    is.false(Bar.is(Baz))
    is.false(Foo.is(Baz))
    is.false(Type.is(Baz))
  })
})
