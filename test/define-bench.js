'use strict'
/* global describe it is */
var fns = require('./bench-util').fns
var bench = global.bench || function () {}

bench('Definition', function () {
  Object.keys(fns).forEach(function (name) {
    var fn = fns[name].defineProduct
    it(name, fn)
  })
})

describe('Alternatives', function () {
  Object.keys(fns).forEach(function (name) {
    it(name, function () {
      var Product = fns[name].defineProduct()
      var p = new Product({name: 'p'})
      p.rate(5)
      is(p.id, 4)
      is(p.name, 'p')
      is(p.rating, 5)
    })
  })
})
