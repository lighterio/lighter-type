'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type', function () {
  describe('constructor', function () {
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

  describe('.hide', function () {
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

  describe('.decorate', function () {
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

  describe('.extend', function () {
    it('extends a type', function () {
      var Dog = Type.extend({
        init: function (name) {
          this.name = name
        },
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
  })

  describe('.init', function () {
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

  describe('.include', function () {
    it('mixes functionality into a type', function () {
      var Boxer = Type.extend({
        punch: function () {
          return 'right jab'
        }
      })
      var Kangaroo = Type.extend({
        getCountry: function () {
          return 'AU'
        }
      })
      Kangaroo.include(Boxer)
      var joey = new Kangaroo()
      var punch = joey.punch()
      is(punch, 'right jab')
    })

    it('supports multiple inheritance', function () {
      var Vehicle = Type.extend({
        init: function Vehicle () {},
        worksOnLand: function () {
          return !!this.isLandVehicle
        },
        worksOnWater: function () {
          return !!this.isWaterVehicle
        }
      })
      var Car = Vehicle.extend({
        init: function Car () {},
        isLandVehicle: true
      })
      var Boat = Vehicle.extend({
        init: function Boat () {},
        isWaterVehicle: true
      })
      var Hovercraft = Vehicle.extend({})
      Hovercraft.include(Car)
      Hovercraft.include(Boat)
      var hovercraft = new Hovercraft()
      is(hovercraft.worksOnLand(), true)
      is(hovercraft.worksOnWater(), true)
      is(Hovercraft.has(Car), true)
      is(Hovercraft.has(Boat), true)
    })
  })

  describe('.is', function () {
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

  describe('.has', function () {
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
})
