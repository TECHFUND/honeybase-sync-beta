社内マニュアルなので日本語で

# オーケストレーションに必要なもの
-
- 詳しくは`fabfile.py`に書いてある

# リモートに構築されるもの
- `node-0.12.2`
- `git`
- `redis`
- `forever` (nodeのプログラムを実行したプロセスがクラッシュしても再起動してくれるsupervisor)
- `sockjs-server` (websocket通信を行う際の軽量ライブラリ)

# フロントでやるべきこと
- `test/client.js`にあるように、PubSubクラスを作成してあるので、それを読み込んでnewしてpublish/subscribe関数を用いる

---

# オーケストレーションのやり方
## ローカルでうつコマンド
- `fab -i ~/.pem/likeapp-kp1.pem -u ec2-user -H pubsub.techfund.jp`
- 目標ホストやpemは毎度任意で変更してください
- redis-serverの実行でfabricコマンドが停止したらctrl-Cで停止
- sshで目標ホストにログインして、websocketを起動する

## websocketプロセスをサーバー上で実行させるには
- `forever start --killTree true --uid 'main' -a honeybase-sync.js`

## プロセスの停止
- `forever stop main`

# その他の機能とログ
- `watch` (honeybase-sync.jsソースコードの変更を自動で読み込むforeverの機能) が有効になっている
- `tail -f ~/.forever/main.log` でwebsocketサーバーのログをtailできる
