const request = require('request-promise-native');
const { facebook } = JSON.parse(Buffer.from(require('../config'), 'base64').toString('binary'));

module.exports = {
    path: '/facebook',
    digester: async (ctx, next) => {
        ctx.body = { success: true, data: Buffer.from(JSON.stringify(facebook, 'binary')).toString('base64') }
        await next();
    }
}
