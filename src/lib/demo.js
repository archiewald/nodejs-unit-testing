exports.add = function(a, b) {
  return a + b;
};

exports.addCallback = function(a, b, callback) {
  setTimeout(() => {
    return callback(null, a + b);
  }, 500);
};

exports.addPromise = function(a, b) {
  if (typeof a === "string" || typeof b === "string") {
    return Promise.reject(new Error("string params are not allowed"));
  }
  return Promise.resolve(a + b);
};

exports.foo = () => {
  console.log("called console.log");
  console.warn("called console.warn");
};
