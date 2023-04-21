# TODOリスト
## 技術スタック
* Laravel v8.83.27
    * パッケージマネージャ
        * composer　v1.8
        Dockerのイメージを使うのでインストール不要
    * PHP v8.1.14
* Nuxt.js
    * パッケージマネージャ
        * node v16.18.0
        * yarn v1.22.19
        バージョン管理のためにVoltaでインストール推奨
        Volta を入れれば特に作業不要
* FastAPI v.0.1.0
    * Python v3.9.16
* Docker v20.10.17

## 開発環境設定
```
cp .env.example .env
cd frontend
cp .env.example .env
```
### frontend
```
cd frontend
yarn install
```
### backend
```
winpty docker compose exec app bash
composer install
php artisan key:generate
php artisan migrate:fresh --seed
```

## makeコマンド
#### dockerコンテナ起動
```
$ make up
```
#### dockerコンテナ終了
```
$ make down
```
#### phpコンテナへのログイン
```
$ make app
```
#### マイグレーション
```
$ make migrate
```
#### php artisan migrate:refresh --seed
```
$ make fresh-seed
```
#### その他Makefileを参照