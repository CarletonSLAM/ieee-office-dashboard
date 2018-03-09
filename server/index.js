
const Koa = require('koa');
const router = require('koa-router')();
const cors = require('@koa/cors');
const static = require('koa-static');
const request = require('request');
const credentials = require('./config');
const { google } = require('googleapis');


const app = module.exports = new Koa();

app.use(async (ctx, next) => {
        if (ctx.request.host.includes('localhost')) await next();
        else return ctx.throw(403, '');
    })
    .use(router.routes()).use(static('./build'));

const endpoints = [
  {
    path: '/insta',
    digester: async (ctx, next) => {
      ctx.body = ctx.req.pipe(request('https://instagram.com/ieeeorg/?__a=1'));
      await next();
    },
  },
  {
    path: '/transpo',
    digester: async (ctx, next) => {
      ctx.body = ctx.req.pipe(request(`https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes?appID=${credentials.transpo.appID}&apiKey=${credentials.transpo.apiKey}&stopNo=${ctx.query.stopNo}&format=json`));
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

const server = app.listen(8129);

console.log(`Server Listening on ${server.address().address}:${server.address().port}`);
