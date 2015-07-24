var forever = require('forever');

var proxy = forever.start(['node', './lib/proxy.js'], {
  max : 10000,
  silent : false,
  killTree : true,
  watch: true,
  watchDirectory: "./lib",
  uid: 'proxy'
});

var server = forever.start(['node', './lib/server.js'], {
  max : 10000,
  silent : false,
  killTree : true,
  watch: true,
  watchDirectory: "./lib",
  uid: 'server'
});
