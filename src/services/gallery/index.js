
/* global gapi */
import { google } from '../../App.creds'

export default {
    getData: () => new Promise(((resolve, reject) => {
        gapi.load('client:auth2', () => gapi.client.init(google.client).then(() => {
            if (!gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes(google.client.scope)) {
                gapi.auth2.getAuthInstance().signIn()
            }
            return gapi.client.drive.files.list({ q: `parents in '${google.folderID}'` })
        }).then(
            res => resolve(res.result),
            res => reject(res.result.error.message),
        ))
    })),
    transformResponse: response => response.files.map(({ id, name }) => ({ name: name.substring(0, name.lastIndexOf('.')), src: `https://drive.google.com/uc?export=view&id=${id}` }))
}
