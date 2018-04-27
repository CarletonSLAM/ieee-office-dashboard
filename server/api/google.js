 const { google } = JSON.parse(Buffer.from(require('../config'), 'base64').toString('binary'))

module.exports = {
    path: '/google',
    digester: async (ctx, next) => {
        ctx.body = { success: true, data: Buffer.from(JSON.stringify(google, 'binary')).toString('base64') }
        await next()
    }
}
