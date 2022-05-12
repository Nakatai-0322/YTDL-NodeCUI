const fs = require("fs");
const dir = "./videos/";
const dir2 = "./audio/";

const boolofmp3 = process.argv[2];

fs.readdir(dir, function(err, files) {
    if (err) {
        throw err;
    };
    files.forEach(function(file) {
        fs.unlink(`${dir}/${file}`, function(err) {
            if (err) {
                throw (err);
            };
            console.log(`${file}を削除済み。`);
        });
    });
});

if (boolofmp3 == "mp3") {
    fs.readdir(dir2, function(err, files) {
        if (err) {
            throw err;
        };
        files.forEach(function(file) {
            fs.unlink(`${dir2}/${file}`, function(err) {
                if (err) {
                    throw (err);
                };
                console.log(`${file}を削除済み。`);
            });
        });
    });
};
