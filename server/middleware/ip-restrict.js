module.exports = async (ctx, next) => {
    console.log(`Request from: ${JSON.stringify(ctx.request.ip)}`)
    if (ctx.request.ip === '127.0.0.1') await next()
    else return ctx.throw(403)
}
