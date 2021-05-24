const Koa = require('koa2'); // Koa 为一个class
const Router = require('koa-router') // koa 路由中间件
const myRouter = require('./lib/Router')
const app = new Koa();
const router = new Router(); // 实例化路由
const mRouter = new myRouter();
const port = 1111;

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h5>Index</h5>';
});
router.post('/test', async (ctx, next) => {
    ctx.response.body = '<h5>test</h5>';
});
mRouter.get('/my', async(ctx, next) => {
    console.log(ctx);
    ctx.response.body = '<h5>my</h5>';
})

app.use(router.routes());
app.use(mRouter.routes());

app.listen(port, () => {
    console.log('This server is running at http://localhost:' + port)
})
