import fetch from 'cross-fetch'
import AppConfig from '../../App.config'

export default {
    getData: () => fetch(`${AppConfig.server}/insta`).then(
        response => response.json(),
        error => error,
    ),
    transformResponse: response => response
}
