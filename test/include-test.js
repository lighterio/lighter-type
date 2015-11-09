'use strict'
/* global describe it */

var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type.include', function () {
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
