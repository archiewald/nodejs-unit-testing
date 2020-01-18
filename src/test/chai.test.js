const chai = require("chai");

const expect = chai.expect;

describe("chai test", () => {
  it("should compare some values", () => {
    expect(1).to.equal(1);
  });

  it("should do stuff", () => {
    expect({ name: "Joe" }).to.deep.equal({ name: "Joe" });
    expect({ name: "Joe" })
      .to.have.property("name")
      .equal("Joe");
    expect(5 > 8).to.be.false;
    expect({}).to.be.a("object");
    expect("foo")
      .to.be.a("string")
      .with.lengthOf(3);
    expect([1, 2, 3].length).to.equal(3);

    expect(null).to.be.null;
    expect(undefined).to.not.exist;
    expect(5).to.exist;
  });
});
