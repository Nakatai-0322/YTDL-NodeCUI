'use strict';

const fs = require('fs');
const dir = './videos/';

fs.readdir(dir, function(err, files) {
    if (err) {
        throw err;
    }
    files.forEach(function(file) {
        fs.unlink(`${dir}/${file}`, function(err) {
            if (err) {
                throw (err);
            }
            console.log(`deleted ${file}`);
        });
    });
});
