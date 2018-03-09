const ONE_SECOND = 1000
const ONE_MINUE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUE * 60

module.exports = {
    server: 'http://localhost:8129',
    services: [
        { name: 'transpo', timeout: 30 * ONE_SECOND},
        { name: 'weather', timeout: 30 * ONE_MINUE},
        { name: 'calendar', timeout: 1 * ONE_HOUR},
        { name: 'gallery', timeout: 2 * ONE_HOUR},
        { name: 'facebook', timeout: 0.5 * ONE_HOUR},
        { name: 'instagram', timeout: 0.5 * ONE_HOUR}

    ]
}
