const chai = require("chai");
const expect = chai.expect;

var demo = require("./demo");

describe("demo", () => {
  context("add", () => {
    it("should add two numbers", () => {
      expect(demo.add(1, 2)).to.equal(3);
    });
  });

  context("callback add", () => {
    it("should test the callback", done => {
      demo.addCallback(1, 2, (err, result) => {
        expect(err).to.not.exist;
        expect(result).to.equal(3);
        done();
      });
    });
  });

  context("promise add", () => {
    it("should add with a promise", done => {
      demo.addPromise(1, 2).then(result => {
        expect(result).to.equal(3);
        done();
      });
    });

    // TODO
    it("should reject if params are strings", done => {
      demo.addPromise("1", "2").catch(reason => {
        expect(reason).to.equal("string params are not allowed");
        done();
      });

      // expect(demo.addPromise("1", "2")).to.eventually.throw(
      //   "string params are not allowed"
      // );
    });
  });
});
