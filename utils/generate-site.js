const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
          //if there is no error, reject the Promise
          if (err) {
              reject (err);
              //return
          }else {
              resolve;
          }
        })
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./dist/index.html', fileContent, err => {
          //if there is no error, reject the Promise
          if (err) {
              reject (err);
              //return
          } else {
              resolve;
          }
        })
    });
};

module.exports = { writeFile, copyFile };