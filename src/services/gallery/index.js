
/* global gapi */
import config from '../../config'

export default {
    getData: () => new Promise(((resolve, reject) => {
        gapi.load('client:auth2', () => gapi.client.init(config.google.client).then(() => {
            if (!gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes(config.google.client.scope)) {
                gapi.auth2.getAuthInstance().signIn()
            }
            return gapi.client.drive.files.list({ q: `parents in '${config.google.folderID}'` })
        }).then(
            res => resolve(res.result),
            res => reject(res.result.error.message),
        ))
    })),
    transformResponse: response => response.files.map(({ id, name }) => ({ name: name.split('.')[0], src: `https://drive.google.com/uc?export=view&id=${id}` }))
}
