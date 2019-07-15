import fetch from 'cross-fetch'
import AppConfig from '../App.config'

const serviceConfig = AppConfig.services.find(x => x.name === 'instagram').config || {}

export default {
    getData: async() => {

        const response = await fetch(`https://instagram.com/${serviceConfig.account}`)
        if (!response.ok) {
            return Promise.reject({
                message: response.statusText === '' ? response._bodyText : response.statusText, // eslint-disable-line no-underscore-dangle
                code: response.status
            })
        }
        const body = await response.text()
        const data = JSON.parse(body.split('window._sharedData = ')[1].split(';</script>')[0])
        if (!data) throw new Error(data)
        const result = data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.map(({ node }) => ({
            caption: node.edge_media_to_caption.edges[0].node.text,
            imgSrc: node.display_url,
            date: node.taken_at_timestamp
        }))
        return result

    },
    transformResponse: response => response
}
