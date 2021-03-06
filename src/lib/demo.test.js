const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinonChai = require("sinon-chai");
const sinon = require("sinon");
chai.use(sinonChai);
const rewire = require("rewire");

const expect = chai.expect;
var demo = rewire("./demo");

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

  context("test doubles", () => {
    it("should spy on log", () => {
      const spy = sinon.spy(console, "log");
      demo.foo();

      expect(spy.calledOnce).to.be.true;
      expect(spy).to.have.been.calledOnce;
      spy.restore();
    });

    it("should stub control.warn", () => {
      const stub = sinon
        .stub(console, "warn")
        .callsFake(() => console.log("im a fake console.warn()"));

      demo.foo();
      expect(stub).to.have.been.calledWith("called console.warn");
      stub.restore();
    });

    context("stub private functions", () => {
      it("should stub createFile", async () => {
        // given
        const createStub = sinon
          .stub(demo, "createFile")
          .resolves("create_stub");
        const callDBStub = sinon.stub().resolves("callDB_stub");
        demo.__set__("callDB", callDBStub);

        // when
        const result = await demo.bar("test.txt");

        // then
        expect(result).to.equal("callDB_stub");
        expect(createStub).to.have.been.calledOnce;
        expect(callDBStub).to.have.been.calledOnce;
        expect(createStub).to.have.been.calledWith("test.txt");
      });
    });
  });
});
