import fetch from 'cross-fetch'

export default {
    getData: () => fetch('http://localhost:8000/insta').then(
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
