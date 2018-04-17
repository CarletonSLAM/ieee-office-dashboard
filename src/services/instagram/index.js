import fetch from 'cross-fetch'
import AppConfig from '../../App.config'

export default {
    getData: () => fetch(`${AppConfig.server}/insta`).then(
        response => response.json(),
        error => error,
    ),
    transformResponse: response => {
        return response.graphql.user.edge_owner_to_timeline_media.edges.map(({ node }) => {
            return {
                type: 'instagram',
                caption: node.edge_media_to_caption.edges[0].node.text,
                imgSrc: node.display_url,
                date: node.taken_at_timestamp
            }
        })
    }
}
