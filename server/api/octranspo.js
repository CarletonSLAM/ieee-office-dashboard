const request = require('request-promise-native');
const credentials = JSON.parse(Buffer.from(require('../config'), 'base64').toString('binary'));

module.exports = {
    path: '/transpo',
    digester: async (ctx, next) => {

        ctx.body = await request(`https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes?appID=${credentials.transpo.appID}&apiKey=${credentials.transpo.apiKey}&stopNo=${ctx.query.stopNo}&format=json`);
        await next();
    }
}
