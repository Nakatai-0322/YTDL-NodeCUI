const fs = require('fs');
const ytdl = require('ytdl-core');
const pathToFfmpeg = require('ffmpeg-static');
const {exec} = require('child_process');

const {url} = require('./url.json');

let title;

ytdl.getInfo(url, {downloadURL: true}, function(err,info){
    if(err)throw err;

    console.log('動画タイトル');
    title = info.player_response.videoDetails.title
    console.log(title);

    download();
});

function download(){
    ytdl(url)
    .pipe(fs.createWriteStream(`${title}.mp4`))
    .on('close',function(){
        exec(`ffmpeg -i "${title}.mp4" "${title}.mp3"`);
    });
}
