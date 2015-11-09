'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type.has', function () {
  it('returns true for itself', function () {
    var Blah = Type.extend({})
    is.true(Blah.has(Blah))
  })

  it('returns false for an unrelated Type', function () {
    var Beep = Type.extend({})
    var Boop = Type.extend({})
    is.false(Beep.has(Boop))
  })

  it('returns false for unrelated stuff', function () {
    var Beep = Type.extend({})
    is.false(Beep.has())
    is.false(Beep.has(undefined))
    is.false(Beep.has(null))
    is.false(Beep.has(true))
    is.false(Beep.has(1))
    is.false(Beep.has('a'))
    is.false(Beep.has(is))
    is.false(Beep.has({}))
    is.false(Beep.has([]))
  })

  it('returns true for ancestors', function () {
    var Foo = Type.extend({})
    var Bar = Foo.extend({})
    var Baz = Bar.extend({})
    is.true(Baz.has(Bar))
    is.true(Baz.has(Foo))
    is.true(Baz.has(Type))
  })

  it('returns true when ancestors include stuff', function () {
    var Grandparent = Type.extend({})
    var Kindness = Type.extend({})
    var Parent = Grandparent.extend({})
    var Child = Parent.extend({})
    Grandparent.include(Kindness)
    is.true(Child.has(Kindness))
    is.true(Parent.has(Kindness))
    is.true(Grandparent.has(Kindness))
  })
})
