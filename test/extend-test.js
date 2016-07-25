'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type.extend', function () {
  it('extends from a type', function () {
    var Dog = Type.extend(function Dog (name) {
      this.name = name
    }, {
      barkback: function (fn) {
        fn(undefined, this.name + ' says "woof!"')
      }
    })
    var fido = new Dog('Fido')
    is.instanceOf(fido, Dog)
    fido.barkback(function (error, message) {
      is.falsy(error)
      is(message, 'Fido says "woof!"')
    })
    is(Object.getPrototypeOf(fido).constructor, Dog)
  })

  it('doesn\'t let sub types modify super types', function () {
    var Super = Type.extend({
      init: function () {
        // This method and Super itself are one and the same.
      }
    })
    Super.extend({
      add: function () {
        // This should be a Sub method, not a Super method.
      }
    })
    is.undefined(Super.prototype.add)
  })

  it('extends prototype and type methods', function () {
    var SubType = Type.extend({
      method: function () {
        return 'prototype method'
      }
    }, {
      method: function () {
        return 'type method'
      }
    })
    var subObject = new SubType()
    is(subObject.method(), 'prototype method')
    is(SubType.method(), 'type method')
  })

  it('works with empty arguments', function () {
    var SubType = Type.extend()
    is.function(SubType)
  })
})
