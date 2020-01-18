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

exports.bar = async fileName => {
  await exports.createFile(fileName);
  let result = await callDB(fileName);

  return result;
};

exports.createFile = fileName => {
  console.log("---in createFile");
  //fake create file
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fake file created");
      return Promise.resolve("done");
    }, 100);
  });
};

function callDB(fileName) {
  console.log("---in callDB");
  //fake create file
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fake db call");
      resolve("saved");
    }, 100);
  });
}
