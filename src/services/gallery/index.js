
/* global gapi atob */
import fetch from 'cross-fetch'
import AppConfig from '../../App.config'
import { generateHeaders, handleErrors } from '../helpers'

export default {
    getData: () => fetch(`${AppConfig.server}/google`, { headers: generateHeaders() })
        .then(handleErrors)
        .then((response) => {
            const creds = JSON.parse(atob(response.data))
            return new Promise((resolve, reject) => { 
                gapi.load('client:auth2', () => {
                    gapi.client.init(creds.client).then(() => {
                        if (!gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes(creds.client.scope)) {
                            gapi.auth2.getAuthInstance().signIn()
                        }
                        return gapi.client.drive.files.list({ q: `parents in '${creds.folderID}'` })
                    }).then(
                        res => resolve(res.result),
                        error => reject(error.error),
                    )
                })
            })
        }),
    transformResponse: response => response.files.map(({ id, name }) => ({ name: name.substring(0, name.lastIndexOf('.')), src: `https://drive.google.com/uc?export=view&id=${id}` }))
}
