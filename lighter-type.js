'use strict'
/**
 * A Type can be instantiated and extended to yield sub-types. whose instances can be constructed
 * with an `init` method.
 */

// The base constructor does nothing.
var Type = module.exports = function Type () {}

/**
 * Extend a Type, yielding a new Type with additional properties from a map.
 *
 * @param  {Function} con   An optional constructor.
 * @param  {Object}   pros  Optional prototype properties.
 * @param  {Object}   cons  Optional constructor properties.
 * @return {Object}         The new Type.
 */
Type.extend = function extend (con, pros, cons) {
  if (typeof con !== 'function') {
    cons = pros
    pros = con
    con = (pros || 0).init || function SubType () {
      con._super.apply(this, arguments)
    }
  }
  var pro = con.prototype

  // Copy.
  write(con, this)
  write(pro, this.prototype)

  // Extend.
  if (pros) {
    for (var key in pros) {
      if (key !== 'init') {
        pro[key] = pros[key]
      }
    }
  }
  if (cons) {
    write(con, cons)
  }

  // Relate.
  this.hide(con, '_super', this)

  return con
}

/**
 * Decorate an object with prototype properties, and run a constructor on it.
 *
 * @param  {Object}         object     An object to decorate.
 * @param  {Boolean}        overwrite  Whether to overwrite existing properties.
 * @param  {Array|Boolean}  args       Optional arguments for the constructor,
 *                                     or false to skip the constructor.
 */
Type.init = function init (object, overwrite, args) {
  // Allow calling with (object, args).
  if (overwrite && overwrite.length) {
    args = overwrite
    overwrite = false
  }
  this.decorate(object, this.prototype, overwrite)
  if (args !== false) {
    this.apply(object, args)
  }
}

/**
 * Decorate an object with a map of properties.
 *
 * @param  {Object}  object     An object to decorate.
 * @param  {Object}  map        An optional map to decorate the object with.
 * @param  {Boolean} overwrite  Whether to overwrite existing properties.
 */
Type.decorate = function decorate (object, map, overwrite) {
  for (var key in map) {
    if (overwrite || (object[key] === undefined)) {
      object[key] = map[key]
    }
  }
}

/**
 * Include another type's prototype methods in this one's.
 *
 * @param  {Object}  type       Another type to mix in.
 * @param  {Boolean} overwrite  Whether to overwrite existing properties.
 */
Type.include = function include (type, overwrite) {
  this.decorate(this.prototype, type.prototype, overwrite)
  var includes = this._includes
  if (includes) {
    includes[includes.length] = type
  } else {
    Type.hide(this, '_includes', [type])
  }
}

/**
 * Define a non-enumerable property on an object.
 *
 * @param  {Object} object  An object to define a property on.
 * @param  {String} key     The name of the property to define.
 * @param  {Any}    value   The value of the property to define.
 */
Type.hide = function hide (object, key, value) {
  Object.defineProperty(object, key, {
    enumerable: false,
    writable: true,
    value: value
  })
}

/**
 * Checks whether this Type is an extension of another Type.
 *
 * @param  {Type}    type  A possible ancestor.
 * @return {Boolean}       True if this type is an extension of the given type.
 */
Type.is = function is (type) {
  var t = this
  do {
    if (t === type) {
      return true
    }
    t = t._super
  } while (t)
  return false
}

/**
 * Checks whether this Type has acquired the functionality of another type
 * via the extend method or the include method.
 *
 * @param  {Type}    type  A type whose functionality might be mixed in.
 * @return {Boolean}       True the given type is extended from or mixed in.
 */
Type.has = function has (type) {
  if (this === type) {
    return true
  }
  var t = this._super
  if (t && (t === type || t.has(type))) {
    return true
  }
  var i = this._includes
  if (i) {
    for (var n = 0, l = i.length; n < l; n++) {
      if (i[n].has(type)) {
        return true
      }
    }
  }
  return false
}

// Write a property.
function write (object, map) {
  for (var key in map) {
    object[key] = map[key]
  }
}
