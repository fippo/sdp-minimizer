exports.btoa = function (s) { return Buffer(s).toString('base64') }
exports.atob = function (s) { return Buffer(s, 'base64').toString() }
