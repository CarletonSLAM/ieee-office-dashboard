
const Koa = require('koa')
const router = require('koa-router')()
const cors = require('@koa/cors');
const {InstagramPosts} = require('instagram-screen-scrape')
const request = require('request')
const credentials = require('../src/credentials')


const app = module.exports = new Koa()

app.use(cors({origin: '*'}))

router.get('/', hellowWorld)
  .get('/insta', getInsta)
  .get('/transpo', getTranspo)

app.use(router.routes());

async function hellowWorld(ctx, next) {
    console.log(ctx)
    ctx.body= { msg: 'Hello World!' }        
    await next();
}


async function getInsta(ctx, next) {
    ctx.body = ctx.req.pipe(request(`https://instagram.com/ieeeorg/?__a=1`))
    await next();
}


async function getTranspo(ctx, next) {
    ctx.body = ctx.req.pipe(request(`https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes?appID=${credentials.transpo.appID}&apiKey=${credentials.transpo.apiKey}&stopNo=${ctx.query.stopNo}&format=json`))
    await next();
}

/**
 * Show creation form.
 */

// async function add(ctx) {
//   await ctx.render('new');
// }

// /**
//  * Show post :id.
//  */

// async function show(ctx) {
//   const id = ctx.params.id;
//   const post = posts[id];
//   if (!post) ctx.throw(404, 'invalid post id');
//   await ctx.render('show', { post: post });
// }

// /**
//  * Create a post.
//  */

// async function create(ctx) {
//   const post = ctx.request.body;
//   const id = posts.push(post) - 1;
//   post.created_at = new Date();
//   post.id = id;
//   ctx.redirect('/');
// }

// listen

if (!module.parent) app.listen(8000);