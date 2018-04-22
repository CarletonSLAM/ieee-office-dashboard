
const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const static = require('koa-static');
const request = require('request-promise-native');
const credentials = JSON.parse(Buffer.from(require('./config'), 'base64').toString('binary'));

const app = module.exports = new Koa();

app.use(async (ctx, next) => {
  console.log(`Request from: ${JSON.stringify(ctx.request.ip)}`);
  if(ctx.request.ip === '127.0.0.1') await next();
  else return ctx.throw(403, '');
}).use(router.routes()).use(static(path.resolve(__dirname, '../build')));

const endpoints = [
  {
    path: '/insta',
    digester: async (ctx, next) => {
      const res = await request('https://instagram.com/ieeeorg');
      const data = JSON.parse(res.split("window._sharedData = ")[1].split(";</script>")[0]);
      if (!data) return ctx.throw(404);
      ctx.body = data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.map(({ node }) => {
        return {
          caption: node.edge_media_to_caption.edges[0].node.text,
          imgSrc: node.display_url,
          date: node.taken_at_timestamp
        }
      })
      await next();

    },
  },
  {
    path: '/transpo',
    digester: async (ctx, next) => {

      ctx.body = await request(`https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes?appID=${credentials.transpo.appID}&apiKey=${credentials.transpo.apiKey}&stopNo=${ctx.query.stopNo}&format=json`);
      await next();
    },
  },
  {
    path: '/weather',
    digester: async (ctx, next) => {
      ctx.body = ctx.req.pipe(request(`http://api.wunderground.com/api/${credentials.weather.apiKey}/forecast/q/Canada/Ottawa.json`));
      await next();
    },
  },

];
endpoints.forEach(e => router.get(e.path, e.digester));

const server = app.listen(8129, '127.0.0.1', () => {
  console.log(`Server Listening on ${server.address().address}:${server.address().port}`);
});
