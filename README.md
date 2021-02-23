# VRCircleDaysDreams.c
In VRChat circle(regular) events calender.

## description
SNS　VRChat上の定期イベントカレンダーです。月～日の定期イベントが見やすく表示され、主催者さんが書き込んだ伝言を見る事ができます。

## licence
This is not an OSS.I make this product public in order to study.You should not use it.

研究用に公開しております。いわゆるOSSではなく、無許可で一部または全部の使用はご遠慮下さい（スタンダードなアプリなので、特に流用したい箇所はないと思いますが）。

Also,using https://github.com/codrops/CSSGlitchEffect/

### Populate body property

Without the use of the body-parser package `req.body` will return undefined. To get express to populate `req.body` you need to install the body parser package and call the package within server.js.

Install the package:

```bash
npm install body-parser
```

Use the package within server.js:

```bash
const bodyParser = require('body-parser');

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())
})
```
