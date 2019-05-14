
/* global gapi */
import fetch from 'cross-fetch'
import AppConfig from '../App.config'
import { handleErrors } from '../helpers'


const QUERY = `parents in '1aWcL4Wc7lOQuSI1-fZ2gX49__n0uwpuX'`
const URL = `https://www.googleapis.com/drive/v3/files`

export default { getAuth: async (access_token) => {
    const response = await fetch(`${AppConfig.DJserver}/api/credentials/google/`, { headers: { Authorization: `Bearer ${access_token}` } })
    const { token } = await handleErrors(response)
    return token
},
getData: async (access_token) => {
    const params = new URLSearchParams({
        q: QUERY,
    })
    const response = await fetch(`${URL}?${params}`,{
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    })
    const json =  await handleErrors(response)
    return json
},
    transformResponse: response => response.files.map(({ id, name }) => ({ name: name.substring(0, name.lastIndexOf('.')), src: `https://drive.google.com/uc?export=view&id=${id}` }))
}