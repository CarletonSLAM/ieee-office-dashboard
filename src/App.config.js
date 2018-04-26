const ONE_SECOND = 1000
const ONE_MINUE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUE * 60

const SERVICES = {
    TRANSPO: 'transpo',
    WEATHER: 'weather',
    CALENDAR: 'calendar',
    GALLERY: 'gallery',
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    INFO: 'info',
    TOP: 'top',
    BOTTOM: 'bottom'
}

module.exports = {
    server: 'http://localhost:8129',
    layout: [
        {
            h: 0.9,
            w: 1,
            tile: SERVICES.TOP
        },
        {
            h: 0.1,
            w: 1,
            tile: SERVICES.BOTTOM
        }
    ],
    services: [
        { name: SERVICES.TRANSPO, timeout: 2 * ONE_MINUE },
        { name: SERVICES.WEATHER, timeout: ONE_HOUR },
        { name: SERVICES.CALENDAR, timeout: ONE_HOUR },
        { name: SERVICES.GALLERY, timeout: 4 * ONE_HOUR },
        { name: SERVICES.FACEBOOK, timeout: ONE_HOUR / 4 },
        { name: SERVICES.INSTAGRAM, timeout: ONE_HOUR }
    ]
}
