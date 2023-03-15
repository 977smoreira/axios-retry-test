const axiosRetry = require('axios-retry');
const axios = require('axios');

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

axios.get('http://localhost:3000')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });