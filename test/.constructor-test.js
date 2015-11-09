'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type constructor', function () {
  it('instantiates an object', function () {
    var type = new Type()
    is.instanceOf(type, Type)
  })

  it('comes from super if omitted', function () {
    var Super = Type.extend({
      init: function (name) {
        this.name = name
      }
    })
    var Sub = Super.extend({
      isSub: function () {
        return true
      }
    })
    var sub = new Sub('sub')
    is(sub.name, 'sub')
    is(sub.isSub(), true)
  })
})
