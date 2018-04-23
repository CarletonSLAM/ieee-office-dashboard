import fetch from 'cross-fetch'
import AppConfig from '../../App.config'
import { generateHeaders } from '../helpers'

export default {
    getData: () => fetch(`${AppConfig.server}/insta`, { headers: generateHeaders() }).then(
        response => response.json(),
        error => error,
    ),
    transformResponse: response => response
}
