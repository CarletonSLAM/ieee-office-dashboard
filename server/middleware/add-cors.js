module.exports = async (ctx, next) => {
    ctx.response.set('Access-Control-Allow-Credentials', true)
    ctx.response.set('Access-Control-Allow-Headers', 'authorization')
    ctx.response.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    ctx.response.set('Allow',  'GET, OPTIONS');
    ctx.response.set('Access-Control-Allow-Origin', '*');
    console.log(ctx.request)
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200;
    return;
  }
    await next();
}
