const fs = require('fs');

const readFile = file => new Promise((resolve, reject) => {
  fs.readFile(file, (err, content) => {
    if (err) return reject(err);

    return resolve(content);
  });
});

module.exports = readFile;
