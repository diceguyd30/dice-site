// Unit tests for the data module

/* global describe it expect */


var data = require("../../data/data.js");

describe("testFunctionOne", function () {
 it("should divide two numbers", function () {
   var division = data.testFunctionOne(8,4);
   expect(division).toBe(2);
 });
});

describe("testFunctionOne", function () {
 it("should return undefined when dividing by 0", function () {
   var division = data.testFunctionOne(8,0);
   expect(division).toBe(undefined);
 });
});