
/* global gapi atob */
import fetch from 'cross-fetch'
import AppConfig from '../../App.config'
import { generateHeaders } from '../helpers'

export default {
    getData: () => new Promise(((resolve, reject) => {
        fetch(`${AppConfig.server}/google`, { headers: generateHeaders() }).then(
            response => response.json(),
            error => error,
        ).then((response) => {
            if (!response.success) return
            const creds = JSON.parse(atob(response.data))
            gapi.load('client:auth2', () => gapi.client.init(creds.client).then(() => {
                if (!gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes(creds.client.scope)) {
                    gapi.auth2.getAuthInstance().signIn()
                }
                return gapi.client.drive.files.list({ q: `parents in '${creds.folderID}'` })
            }).then(
                res => resolve(res.result),
                res => reject(res.result.error.message),
            ))
        })
    })),
    transformResponse: response => response.files.map(({ id, name }) => ({ name: name.substring(0, name.lastIndexOf('.')), src: `https://drive.google.com/uc?export=view&id=${id}` }))
}
