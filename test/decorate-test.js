'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type.decorate', function () {
  it('decorates with additions', function () {
    var o = {}
    Type.decorate(o, {a: 1})
    is(o.a, 1)
  })

  it('doesn\'t overwrite properties unless told', function () {
    var o = {a: 1, b: 0}
    var p = {b: 2, c: 3}

    // First, decorate without overwriting.
    Type.decorate(o, p)
    is.same(o, {a: 1, b: 0, c: 3})

    // Then decorate with overwriting.
    Type.decorate(o, p, true)
    is.same(o, {a: 1, b: 2, c: 3})
  })
})
