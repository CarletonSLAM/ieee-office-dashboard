const request = require('request-promise-native')
const credentials = JSON.parse(Buffer.from(require('../config'), 'base64').toString('binary'))

module.exports = {
    path: '/weather',
    digester: async (ctx, next) => {
        ctx.body = ctx.req.pipe(request(`http://api.wunderground.com/api/${credentials.weather.apiKey}/forecast/q/Canada/Ottawa.json`))
        await next()
    }
}
