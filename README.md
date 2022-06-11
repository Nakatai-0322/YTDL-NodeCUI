# Node.jsでのYouTubeダウンローダー

## 下準備

1. [yarn](https://classic.yarnpkg.com/en/docs/install)をインストールしてください。
2. `yarn`と実行してください。

下準備は以上です。

## 使い方

1. `node dl <YouTubeのURL>`でダウンロードできます。
この際、mp3ファイルが、`./audio/<YouTubeのID>.mp3`として保存されます。
2. 要らなくなったmp4ファイルを削除したい場合は、`node del`で削除できます。

※mp3ファイルがいらない場合は、`--nomp3`オプションをつけてください。

## 使用ライブラリ

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
- [ytdl-core](https://github.com/fent/node-ytdl-core)
