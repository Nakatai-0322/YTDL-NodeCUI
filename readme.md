# Node.jsでのYouTubeダウンローダー

## 使い方

1. `node dl <YouTubeのURL>`でダウンロードできます。
この際、mp3ファイルが、`./audio/<YouTubeのID>.mp3`として保存されます。
2. 要らなくなったmp4ファイルを削除したい場合は、`node del`で削除できます。

※mp3ファイルがいらない場合は、`--nomp3`オプションをつけてください。

## 使用ライブラリ

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
- [ytdl-core](https://github.com/fent/node-ytdl-core)
