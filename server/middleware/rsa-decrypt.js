const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const opts = {
    key: fs.readFileSync(path.resolve(__dirname,'../keys/server.private.pem')),
    padding: crypto.RSA_PKCS1_OAEP_PADDING
}


module.exports = async (ctx, next) => {
    if(ctx.request.header && ctx.request.header.authorization) {
        try{
            if(crypto.privateDecrypt(opts, Buffer.from(ctx.request.header.authorization, 'base64')).toString() === "React Error") await next()
        } catch(e){
            
            console.log(`Unauthorized access from ${ctx.request.ip}`);
            return ctx.throw(403)
        }
    }else {
        return ctx.throw(403)
    }
}
