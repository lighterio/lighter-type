'use strict'
/* global it */
var fns = require('./bench-util').fns
var bench = global.bench || function () {}

bench('Instantiation and Usage', function () {
  Object.keys(fns).forEach(function (name) {
    var Product = fns[name].defineProduct()
    var props = {name: 'widget'}
    var fn = function () {
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
      new Product(props).rate(12)
    }
    it(name, fn)
  })
})
