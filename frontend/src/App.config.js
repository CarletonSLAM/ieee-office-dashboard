const SERVICES = {
    TRANSPO: 'transpo',
    OPENWEATHERMAP: 'openweathermap',
    CALENDAR: 'calendar',
    GALLERY: 'gallery',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    INFO: 'info'
}

module.exports = {
    appName: 'IEEE Carleton Dashboard',
    serverURL: `${process.env.REACT_APP_BACKEND_URL || window.location.origin}`,
    layout: [
        {
            h: 0.84,
            w: 1,
            layout: [
                {
                    w: 0.33,
                    h: 1,
                    layout: [
                        {
                            w: 1,
                            h: 0.5,
                            tile: SERVICES.INSTAGRAM
                        },
                        {
                            w: 1,
                            h: 0.5,
                            tile: SERVICES.TWITTER
                        }
                    ]
                },
                {
                    w: 0.33,
                    h: 1,
                    layout: [
                        {
                            w: 1,
                            h: 0.4,
                            tile: SERVICES.INFO
                        },
                        {
                            w: 1,
                            h: 0.6,
                            tile: SERVICES.GALLERY
                        }
                    ]
                },
                {
                    w: 0.33,
                    h: 1,
                    tile: SERVICES.CALENDAR
                }
            ]
        },
        {
            h: 0.16,
            w: 1,
            layout: [
                {
                    w: 0.5,
                    h: 1,
                    tile: SERVICES.TRANSPO
                },
                {
                    w: 0.5,
                    h: 1,
                    tile: SERVICES.OPENWEATHERMAP
                }
            ]
        }
    ]
}
