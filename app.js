const fs = require('fs');

const ytdl = require('ytdl-core');
const readline = require('readline');

const url = process.argv[2];

var parsedUrl = youtube_parser(url);

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length==11)? match[7] : false;
}

let youtubeId = youtube_parser(url);

const video = ytdl(url, { filter: (format) => format.container === 'mp4' });

let starttime;

video.pipe(fs.createWriteStream(`${youtubeId}.mp4`));

video.once('response', () => starttime = Date.now());

video.on('progress', (chunkLength, downloaded, total) => {
    const floatDownloaded = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(floatDownloaded * 100).toFixed(2)}% downloaded`);
    process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(`, estimated time left: ${(downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)}minutes `);
    readline.moveCursor(process.stdout, 0, -1);
});

video.on('end', () => {
    process.stdout.write('\n\n');

    //DLしたYoutube動画の情報
    ytdl.getInfo(youtubeId, (err, info) => {
        if (err) throw err;

        console.log('\n動画情報もろもろ');
        console.log(info.player_response.videoDetails);

        console.log('\n動画タイトル');
        console.log(info.player_response.videoDetails.title);

        console.log('\n秒数');
        console.log(info.player_response.videoDetails.lengthSeconds);

        console.log('\nサムネイル');
        console.log(info.player_response.videoDetails.thumbnail);
    });
});
