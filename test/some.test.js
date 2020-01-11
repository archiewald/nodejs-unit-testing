const assert = require("assert");

describe("file  to be tested", () => {
  context("function to be tested", () => {
    before(() => {
      console.log("========= before");
    });

    after(() => {
      console.log("========= after");
    });

    beforeEach(() => {
      console.log("----- beforeEach");
    });

    afterEach(() => {
      console.log("----- afterEach");
    });

    it("should do something", () => {
      assert.equal(1, 1);
    });
    it("should do something else", () => {
      assert.deepEqual({ name: "joe" }, { name: "joe" });
    });
    it("pending test");
    it("should show NODE_ENV", () => {
      console.log("ENV: ", process.env.NODE_ENV);
    });
  });

  context("another function", () => {
    it("should do something");
  });
});
