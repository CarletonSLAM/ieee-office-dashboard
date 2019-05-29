export const handleErrors = (response) => {
    if (!response.ok) {
        return Promise.reject({
            message: response.statusText === '' ? response._bodyText : response.statusText, // eslint-disable-line no-underscore-dangle
            code: response.status
        })
    }
    return response.json()
}
