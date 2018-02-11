const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const { fromJSON, toJSON, merge } = require('../')
const EnhancedMap = require('../EnhancedMap')

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

var pojo2 = {
  key: 'lorem',
  value: 'ipsum'
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

describe('merge', function () {
  it('merge', function () {
    let map = fromJSON(pojo)
    let merged = merge(map, pojo2)
    let json = toJSON(merged)
    console.log(merged)
    assert.deepEqual(json, { ...pojo, ...pojo2 })
  })
})

describe('EnhancedMap.fromJSON/EnhancedMap.toJSON', function () {
  it('EnhancedMap.fromJSON/EnhancedMap.toJSON', function () {
    let json = EnhancedMap.create().fromJSON(pojo).toJSON()
 
    assert.deepEqual(json, pojo)
  })
})

describe('EnhancedMap.merge', function () {
  it('EnhancedMap.merge', function () {
    let json = new EnhancedMap().fromJSON(pojo).merge(pojo2).toJSON()
    assert.deepEqual(json, { ...pojo, ...pojo2 })
  })
})
