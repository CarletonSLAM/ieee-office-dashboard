
const Koa = require('koa');
const router = require('koa-router')();
const cors = require('@koa/cors');
const request = require('request');
const credentials = require('../src/config');
const { google } = require('googleapis');


const app = module.exports = new Koa();

app.use(cors({ origin: '*' })).use(router.routes());

const endpoints = [
  {
    path: '/',
    digester: async (ctx, next) => {
      ctx.body = { msg: 'Hello World!' };
      await next();
    },
  },
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

if (!module.parent) app.listen(8000);
