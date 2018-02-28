import moment from 'moment';

export default {
  getData: () => fetch('http://localhost:8000/insta').then(
    (response) => { if (response.ok) { return response.json(); } },
    (error) => { console.error(error); return error; },
  ),
  transformResponse: response => response.user.media.nodes.map(({ caption, display_src, date }) => ({
    type: 'instagram',
    caption,
    imgSrc: display_src,
    date,
  })),
};
