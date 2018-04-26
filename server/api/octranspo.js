const request = require('request-promise-native')
const { transpo } = JSON.parse(Buffer.from(require('../config'), 'base64').toString('binary'))

const base = 'https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes'
module.exports = {
    path: '/transpo',
    digester: async (ctx, next) => {
        ctx.body = await request(`${base}?appID=${transpo.appID}&apiKey=${transpo.apiKey}&stopNo=${ctx.query.stopNo}&format=json`)
        await next()
    }
}
