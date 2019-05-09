
/* global gapi */
import fetch from 'cross-fetch'
import AppConfig from '../App.config'
import { handleErrors } from '../helpers'

export default { getAuth: async (access_token) => {
    const response = await fetch(`${AppConfig.DJserver}/api/credentials/google/`, { headers: { Authorization: `Bearer ${access_token}` } })
    const { token } = await handleErrors(response)
    return token
},
getData: async (access_token) => {
    try {
        await new Promise((resolve) => gapi.load('client:auth2', () => resolve()))
        await gapi.client.setToken({access_token})
        await gapi.client.init({
            clientId: '830252654788-m17pr6ci1q9n1cqls761qdte1oqslscl.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        })
        const { result } = await gapi.client.drive.files.list({ q: `parents in '1aWcL4Wc7lOQuSI1-fZ2gX49__n0uwpuX'` })
        return result

    } catch (err) {
        console.log("EEEE", err)
        Promise.reject(err.result.error.message)
    }
},
    transformResponse: response => response.files.map(({ id, name }) => ({ name: name.substring(0, name.lastIndexOf('.')), src: `https://drive.google.com/uc?export=view&id=${id}` }))
}
