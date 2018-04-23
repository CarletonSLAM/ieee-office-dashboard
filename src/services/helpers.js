/* global atob */
import NodeRSA from 'node-rsa'
import pemKey from '../keys/server.public'

const rsa = new NodeRSA(atob('LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0K') + pemKey + atob('LS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'))
export default {
    generateHeaders: () => ({
        authorization: rsa.encrypt(Buffer.from('React Error')).toString('base64')
    })
}
