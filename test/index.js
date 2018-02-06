const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const { fromJSON, toJSON } = require('../')

var pojo = {
  depth_0: {
    depth_1: {
      depth_2: {
        depth_3: {
          depth_4: {
            array: [1,2,3],
            number: new Number(1),
            date: new Date(),
            set: new Set(),
          }
        }
      }
    }
  }
}

describe('fromJSON/toJSON', function () {
  it('fromJSON/toJSON', function () {
    let map = fromJSON(pojo)
    let json = toJSON(map)
    console.log('map', map)
    console.log('json', json)
    assert.deepEqual(json, pojo)
  })
})

Map.prototype.fromJSON = function(opts) {
  fromJSON(this, opts)
}

Map.prototype.toJSON = function(opts) {
  fromJSON(this, opts)
}