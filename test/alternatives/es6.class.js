'use strict'

exports.defineProduct = function () {
  function RandomId () {
    this.id = 4
  }

  class Rated {
    constructor () {
      this.rating = undefined
    }

    rate (stars) {
      this.rating = stars
    }
  }

  class Base extends Rated {
    constructor () {
      super()
      RandomId.call(this)
    }
  }

  class Product extends Base {
    constructor (options) {
      super()
      this.name = options.name
    }
  }
  return Product
}
