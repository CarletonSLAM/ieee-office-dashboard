const request = require('request-promise-native')

module.exports = {
    path: '/insta',
    digester: async (ctx, next) => {
        const res = await request('https://instagram.com/ieeeorg')
        const data = JSON.parse(res.split('window._sharedData = ')[1].split(';</script>')[0])
        if (!data) return ctx.throw(404)
        ctx.body = data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.map(({ node }) => ({
            caption: node.edge_media_to_caption.edges[0].node.text,
            imgSrc: node.display_url,
            date: node.taken_at_timestamp
        }))
        await next()
    }
}
