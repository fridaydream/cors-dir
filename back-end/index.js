const Koa = require('koa');
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const cors = require('koa2-cors')
const app = new Koa();
const router = new Router();
app.use(bodyParser());

app.use(
  cors({
    origin: function(ctx) { //设置允许来自指定域名请求
      return ctx.req.headers.origin; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)

router.post("/api/users", async (ctx) => {
  // 使用了koa-bodyparser才能从ctx.request拿到body
  const postData = ctx.request.body;
  console.log(ctx.request)
  ctx.body = postData;
});

app.use(router.routes());

app.use(async ctx => {
  ctx.status = 200;
  if (ctx.method === 'OPTIONS') {
    ctx.status = 200;
    ctx.body = '';
  }
});
app.listen(3000);