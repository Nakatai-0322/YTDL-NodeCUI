const fs = require("fs");
const ytdl = require("ytdl-core");
const readline = require("readline");
const ffmpeg = require("fluent-ffmpeg");

const url = process.argv[2];
let youtubeId = ytdl.getVideoID(url);
const video = ytdl(url, {
    filter: format => format.container === 'mp4'
});

let starttime = NaN;
let title = youtubeId;

if (title !== youtubeId && title.length >= 10) {
    title = title.substr(0, 10) + '?';
};

video.pipe(fs.createWriteStream(`./videos/${title}.mp4`));
video.once('response', () => starttime = Date.now());
video.on('progress', (chunkLength, downloaded, total) => {
    const floatDownloaded = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(floatDownloaded * 100).toFixed(2)}%のダウンロード完了`);
    process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB/${(total / 1024 / 1024).toFixed(2)}MB)\n`);
    process.stdout.write(`稼働時間: ${downloadedMinutes.toFixed(2)}分`);
    process.stdout.write(`, 推定残り時間: ${(downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)}分`);
    readline.moveCursor(process.stdout, 0, -1);
});
video.on('end', () => {
    if (process.argv[3] !== "--nomp3") {
        ffmpeg(`./videos/${title}.mp4`)
            .save(`./audio/${title}.mp3`);
    };
    process.stdout.write('\n\n');
});
