const axiosRetry = require('axios-retry');
const axios = require('axios');

let errorCount = 0;

function successInterceptor(data) {
    return data;
}

function errorInterceptor(error) {
    errorCount++
    const data = error.response?.statusText || error.message;
    if (error.code === 'ECONNABORTED' || (error.response && error.response.status >= 500)) {
        return Promise.reject(new Error(` ${errorCount}: IF ERROR: ${data}`));
    }

    return Promise.reject(new Error(`${errorCount}: ELSE ERROR: ${data}`));
}

axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    onRetry: (retryCount, error, requestConfig) => {
        console.warn(
            `${error.message} for ${requestConfig.method?.toUpperCase()} ${requestConfig.url
            }! Retry attempt: ${retryCount}`,
        );
    }
});

axios.interceptors.response.use(successInterceptor, errorInterceptor);

axios.get('http://localhost:3000')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });