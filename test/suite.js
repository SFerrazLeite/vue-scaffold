require("jsdom-global")();
global.expect = require("chai").expect;

var context = require.context(".", true, /\.spec\.js$/);
context.keys().forEach(context);
module.exports = context;
