var Type = require('../../lighter-type')

exports.defineProduct = function () {
  var RandomId = Type.extend(function () {
    this.id = 4
  })
  var Rated = Type.extend(function () {
    this.rating = undefined
  }, {
    rate: function (stars) {
      this.rating = stars
    }
  })
  var Base = Rated.extend(function () {
    RandomId.call(this)
    Rated.call(this)
  })
  var Product = Base.extend(function (options) {
    Base.call(this)
    this.name = options.name
  })
  return Product
}
