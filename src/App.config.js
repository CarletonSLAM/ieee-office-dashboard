const ONE_SECOND = 1000
const ONE_MINUE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUE * 60

module.exports = {
    server: 'http://localhost:8129',
    services: [
        { name: 'transpo', timeout: ONE_MINUE },
        { name: 'weather', timeout: ONE_HOUR },
        { name: 'calendar', timeout: ONE_HOUR },
        { name: 'gallery', timeout: 2 * ONE_HOUR },
        { name: 'facebook', timeout: ONE_HOUR / 3 },
        { name: 'instagram', timeout: ONE_HOUR }

    ]
}
