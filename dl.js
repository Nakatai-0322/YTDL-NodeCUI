// 依存関係のインポート
const fs = require('fs');

const ytdl = require('ytdl-core');
const readline = require('readline');
const ffmpeg = require('fluent-ffmpeg');

// URLを"node app"以後のargで代入
const url = process.argv[2];

// YouTubeのURLからIDをパースする関数
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length==11)? match[7] : false;
}

let youtubeId = youtube_parser(url);

const video = ytdl(url, { filter: (format) => format.container === 'mp4' });

let starttime;

video.pipe(fs.createWriteStream(`./videos/${youtubeId}.mp4`));

video.once('response', () => starttime = Date.now());

video.on('progress', (chunkLength, downloaded, total) => {
    const floatDownloaded = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(floatDownloaded * 100).toFixed(2)}%のダウンロード完了`);
    process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB/${(total / 1024 / 1024).toFixed(2)}MB)\n`);
    process.stdout.write(`稼働時間: ${downloadedMinutes.toFixed(2)}分`);
    process.stdout.write(`, 推定残り時間: ${(downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)}分 `);
    readline.moveCursor(process.stdout, 0, -1);
});

video.on('end', () => {
    ffmpeg(`./videos/${youtubeId}.mp4`)
        .save(`./audio/${youtubeId}.mp3`);

    process.stdout.write('\n\n');
});
