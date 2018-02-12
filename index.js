const useLib = parseInt(process.versions.node, 10) < 8

exports.EnhancedMap = useLib ? require('./lib/EnhancedMap') : require('./src/EnhancedMap')

exports.fromJSON = useLib ? require('./lib').fromJSON : require('./src').fromJSON
exports.toJSON = useLib ? require('./lib').toJSON : require('./src').toJSON
exports.merge = useLib ? require('./lib').merge : require('./src').merge
exports.getIn = useLib ? require('./lib').getIn : require('./src').getIn
exports.setIn = useLib ? require('./lib').setIn : require('./src').setIn