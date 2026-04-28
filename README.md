# Accueve

Accueve とは，ユーザが毎日継続的に取り組むべきこと(以降，タスク)について，達成度を記録・管理し，毎日の継続を支援するためのアプリケーションである．

Accueve では，以下の機能を利用できる．
1. タスクの登録  
2. 達成度の記録  
3. タスク情報の更新  
4. これまでの取り組みの閲覧
5. 格言の閲覧

Accueve という名前の由来は，Accumulate(蓄積する)+Achieve(達成する) である．

## 利用手順
### requirements
	node.js >= 22.14.0
	npm >= 11.6.0

### set up
1. git clone
```
git clone git@github.com:hirata0813/accueve.git
```
2. 依存パッケージインストール
cd accueve
npm install
3. 環境変数を設定
cp .env.example .env
`.env`の7行目を`DATABASE_URL="file:./dev.db"`にする
4. prisma セットアップ
npx prisma migrate dev --name init
5. サーバ起動
npm run dev
