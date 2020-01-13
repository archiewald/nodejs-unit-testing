const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
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

    it("should test promise with async await", async () => {
      var result = await demo.addPromise(1, 2);

      expect(result).to.equal(3);
    });

    it("should test promise with chai-as-promised", async () => {
      await expect(demo.addPromise(1, 2)).to.eventually.equal(3);
    });

    it("should throw error if params are strings", async () => {
      await expect(demo.addPromise("1", "2")).to.be.rejectedWith(
        "string params are not allowed"
      );
    });
  });
});
