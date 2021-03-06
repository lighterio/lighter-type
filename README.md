# lighter-type
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-type.svg)](//www.npmjs.com/package/lighter-type)
[![Downloads](https://img.shields.io/npm/dm/lighter-type.svg)](//www.npmjs.com/package/lighter-type)
[![Build](https://img.shields.io/travis/lighterio/lighter-type.svg)](//travis-ci.org/lighterio/lighter-type)
[![Coverage](https://img.shields.io/codecov/c/github/lighterio/lighter-type/master.svg)](//codecov.io/gh/lighterio/lighter-type)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//www.npmjs.com/package/standard)

The `lighter-type` module is a prototypal inheritance utility with
[better performance](//github.com/lighterio/lighter-type/blob/master/BENCHMARKS.md)
than similar inheritance utilities.

It supports:
* Constructors
* Prototypal inheritance
* Multiple inheritance
* Non-enumerable property definitions

## Installation
From your project directory, install and save as a dependency:
```bash
npm install --save lighter-type
```

## Usage
The `lighter-type` module outputs a constructor with several methods.

- [Type.extend(prototypeProps[, constructorProps])](#typeextendprototypeprops-constructorprops)
- [Type.init(object[, overwrite][, args])](#typeinitobject-overwrite-args)
- [Type.decorate(object[, map][, overwrite])](#typedecorateobject-map-overwrite)
- [Type.include(type[, overwrite])](#typeincludetype-overwrite)
- [Type.is(type)](#typeistype)
- [Type.has(type)](#typehastype)
- [Type.hide(object, key, value)](#typehideobject-key-value)

<a name="Type.extend"></a>
### Type.extend([constructor], [prototypeProps], [constructorProps])
Define and return a sub type of the `Type` object, with a prototype decorated
with optional `prototypeProps` (a map of additional prototype properties) and optional
`constructorProps` (a map additional type properties. The sub type itself also inherits
the properties of its super type (such as the `extend` method).

When the `prototypeProps` argument includes a property called `init`, it is used as the
constructor for the sub type rather than being added as a prototype property.

```js
var Type = require('lighter-type')

// Construct a new person with a name.
var Person = Type.extend(function Person (name) {
  this.name = name
}, {
  // Give a person a default salutation of "Hello".
  salutation: 'Hello',

  // Greet a person with their defined salutation.
  greet: function () {
    console.log(this.salutation + ', ' + this.name + '!')
  }
}, {
  // Identify this type, if asked.
  getTypeName: function () {
    return 'Person'
  }
})

// Make a Friend sub type by extending the Person type.
var Friend = Person.extend({
  // Be a bit more informal with friends.
  salutation: 'Hi'
}, {
  // Identify this type, if asked.
  getTypeName: function () {
    return 'Friend'
  }
})

// Instantiate Bob, and greet him.
var bob = new Person('Bob')
bob.greet()
//> "Hello, Bob!"

// Instantiate Joe, and greet him.
var joe = new Friend('Joe')
joe.greet()
//> "Hi, Joe!"

// Make sure a Friend is a Friend.
console.log(Friend.getTypeName())
//> "Friend"
```

Each type's prototype has `_super` property which references its parent
prototype, and each type has a `_super` property which references its
parent type.

```js
var Type = require('lighter-type')

var Robot = Type.extend({
  bend: function (object) {
    object.isBent = true
  }
})

var Bender = Robot.extend({
  bend: function (object) {
    this._super.bend(object)
    console.log('Bite my shiny metal ass.')
  }
})

var beam = {}
var bender = new Bender()
bender.bend(beam)
//> Bite my shiny metal ass.

console.log(beam.isBent)
//> true
```

<a name="Type.init"></a>
### Type.init(object[, overwrite][, args])
Decorate an object with the prototype of a `Type`, and call its constructor
on the object with an `args` array, unless `args` is `false`, in which case
the constructor will be skipped.

Any object that extends Type (such as
[lighter-emitter](//github.com/lighterio/lighter-emitter))
will inherit `Type.init` and other Type methods.

```js
// The `lighter-emitter` module extends `lighter-type`.
var Emitter = require('lighter-emitter')

// Make the `console` object into an emitter.
Emitter.init(console)

console.on('hi', function (name) {
  console.log('Hi, ' + name + '!')
})

console.emit('hi', 'Sam')
//> Hi, Sam!
```

<a name="Type.decorate"></a>
### Type.decorate(object[, map][, overwrite])
Decorate an `object` with a `map` of additional properties (or overriding
properties if `overwrite` is truthy). If the map is not specified, the `Type`
prototype will decorate the `object` prototype instead.

```js
var Type = require('lighter-type')

// Add a few methods to the Array object's prototype.
Type.decorate(Array.prototype, {
  first: function () {
    return this[0]
  },
  last: function () {
    return this[this.length - 1]
  },
  sum: function () {
    var s = 0
    for (var i = 0, l = this.length; i < l; i++) {
      s += this[i]
    }
    return s
  }
})

// Create a plain old array of numbers.
var a = [1, 2, 3]

console.log(a.first())
//> 1

console.log(a.last())
//> 3

console.log(a.sum())
//> 6
```

<a name="Type.include"></a>
### Type.include(type[, overwrite])
Implement multiple inheritance by decorating one Type's prototype with the
prototype properties of another.

```js
var Type = require('lighter-type')

// A vehicle might work on land or water.
var Vehicle = Type.extend({

  // Return isLandVehicle as a boolean.
  worksOnLand: function () {
    return !!this.isLandVehicle
  },

  // Return isWaterVehicle as a boolean.
  worksOnWater: function () {
    return !!this.isWaterVehicle
  }

})

// A car is a land vehicle.
var Car = Vehicle.extend({
  isLandVehicle: true
})

// A boat is a water vehicle.
var Boat = Vehicle.extend({
  isWaterVehicle: true
})

// A hovercraft is also a vehicle.
var Hovercraft = Vehicle.extend({})

// A hovercraft includes the functionality of a Car and a Boat.
Hovercraft.include(Car)
Hovercraft.include(Boat)

// Create a new Hovercraft.
var hovercraft = new Hovercraft()

console.log(hovercraft.worksOnLand())
//> true

console.log(hovercraft.worksOnWater())
//> true
```

<a name="Type.is"></a>
### Type.is(type)
Check whether this Type is descended from another Type.

```js
var Foo = Type.extend({})
var Bar = Foo.extend({})
var Baz = Bar.extend({})

console.log(Baz.is(Foo))
//> true

console.log(Foo.is(Baz))
//> false
```

<a name="Type.has"></a>
### Type.has(type)
Check whether this Type has acquired the functionality of another type
via the extend method or the include method.

```js
var Type = require('lighter-type')

// Create an object with a visible (i.e. enumerable) method.
var object = {
  visible: function () {
    console.log('I am visible.')
  }
}

// Add a non-enumerable property called "hidden".
Type.hide(object, 'hidden', function () {
  console.log('I am hidden.')
})

// Verify that the "hidden" method exists.
object.hidden()
//> "I exist."

// Verify that only the "visible" method is enumerable.
for (var key in object) {
  console.log(key)
}
//> "visible"
```

<a name="Type.hide"></a>
### Type.hide(object, key, value)
Create a property of `object` named `key` with value `value`, and "hide" it by
making it non-enumerable.

```js
var Type = require('lighter-type')

// Create an object with a visible (i.e. enumerable) method.
var object = {
  visible: function () {
    console.log('I am visible.')
  }
}

// Add a non-enumerable property called "hidden".
Type.hide(object, 'hidden', function () {
  console.log('I am hidden.')
})

// Verify that the "hidden" method exists.
object.hidden()
//> "I exist."

// Verify that only the "visible" method is enumerable.
for (var key in object) {
  console.log(key)
}
//> "visible"
```

## More on lighter-type...
* [Contributing](//github.com/lighterio/lighter-type/blob/master/CONTRIBUTING.md)
* [License (ISC)](//github.com/lighterio/lighter-type/blob/master/LICENSE.md)
* [Change Log](//github.com/lighterio/lighter-type/blob/master/CHANGELOG.md)
* [Benchmarks](//github.com/lighterio/lighter-type/blob/master/BENCHMARKS.md)
* [Roadmap](//github.com/lighterio/lighter-type/blob/master/ROADMAP.md)
