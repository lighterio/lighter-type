'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type.hide', function () {
  it('creates hidden properties', function () {
    var o = {a: 1}
    Type.hide(o, 'b', 2)
    is(o.a, 1)
    is(o.b, 2)

    // The "a" property shouldn't be enumerable.
    for (var p in o) {
      is(p, 'a')
    }
  })
})
