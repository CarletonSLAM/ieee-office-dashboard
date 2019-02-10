
const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const router = require('koa-router')()
const serve = require('koa-static')
const https = require('https')
const api = require('./api')

const app = new Koa()
const decrypt = require('./middleware/rsa-decrypt')
const ipRestrict = require('./middleware/ip-restrict')
const addCors = require('./middleware/add-cors')
// Decrypt headers to validate auth
if (process.env.NODE_ENV === 'production') {
    console.log('Decryption stage enabled')
    router.use(decrypt)
}
// Generate API Endpoints
api.forEach(e => router.get(e.path, e.digester))

app.use(ipRestrict)
app.use(addCors)
app.use(serve(path.resolve(__dirname, '../build')))
app.use(router.routes())
app.use(router.allowedMethods())

const httpsServer = https.createServer({
    key: fs.readFileSync(path.join('server', 'ssl','server.key'), 'utf8'),
    cert: fs.readFileSync(path.join('server','ssl','server.cert'), 'utf8'),
    requestCert: false,
    rejectUnauthorized: true
}, app.callback())
  .listen(8129, '127.0.0.1', () => {
    console.log(`Server Listening on ${httpsServer.address().address}:${httpsServer.address().port}`)
})
