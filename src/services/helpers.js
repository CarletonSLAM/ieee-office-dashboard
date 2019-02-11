/* global atob */
import NodeRSA from 'node-rsa'
import pemKey from '../keys/server.public'

const rsa = new NodeRSA(atob('LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0K') + pemKey + atob('LS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'))
export const generateHeaders = () => ({
    authorization: rsa.encrypt(Buffer.from('React Error')).toString('base64')
})

export const handleErrors = (response) => {
    if (!response.ok) {
        Promise.reject({
            message: response.statusText === '' ? response._bodyText : response.statusText, // eslint-disable-line no-underscore-dangle
            code: response.status
        })
    }
    return response.json()
}
