import moment from 'moment'
export default {
    getData: () => {
        return fetch('https://www.instagram.com/ieeeorg/?__a=1')
        .then(
            response => {if (response.ok) { return response.json()}},
            error => {console.error(error); return error }
          )
    },
    transformResponse: (response) => {
        // debugger;
        return response.user.media.nodes.map(({caption, display_src, date}) => {
            return {
                caption,
                imgSrc: display_src,
                date
            }
        })

    }
}
