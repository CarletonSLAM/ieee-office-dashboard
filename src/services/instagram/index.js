import fetch from 'cross-fetch'
import AppConfig from '../../App.config'

export default {
    getData: () => fetch(`${AppConfig.server}/insta`).then(
        response => response.json(),
        error => error,
    ),
    transformResponse: response => response.user.media.nodes.map(({ caption, display_src: src, date }) => ({
        type: 'instagram',
        caption,
        imgSrc: src,
        date
    }))
}
