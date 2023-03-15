# Axios client configured without interceptor

```javascript
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
```

## Dummy server log
```
2023-03-15T11:46:26.984Z HIT
2023-03-15T11:46:27.288Z HIT
2023-03-15T11:46:27.750Z HIT
2023-03-15T11:46:28.652Z HIT
```

## Axios client log

```
Request failed with status code 500 for GET http://localhost:3000! Retry attempt: 1
Request failed with status code 500 for GET http://localhost:3000! Retry attempt: 2
Request failed with status code 500 for GET http://localhost:3000! Retry attempt: 3
Error: Request failed with status code 500
    at createError (/home/sinayra/Documents/axios-retry-test/axios-client/node_modules/axios/lib/core/createError.js:16:15)
    at settle (/home/sinayra/Documents/axios-retry-test/axios-client/node_modules/axios/lib/core/settle.js:17:12)
    at IncomingMessage.handleStreamEnd (/home/sinayra/Documents/axios-retry-test/axios-client/node_modules/axios/lib/adapters/http.js:260:11)
    at IncomingMessage.emit (events.js:412:35)
    at endReadableNT (internal/streams/readable.js:1333:12)
    at processTicksAndRejections (internal/process/task_queues.js:82:21) {
  config: {
    url: 'http://localhost:3000',
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'axios/0.21.1'
    },
    transformRequest: [ [Function (anonymous)] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    adapter: [Function: httpAdapter],
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: [Function: validateStatus],
    'axios-retry': { retryCount: 3, lastRequestTime: 1678880788647 },
    data: undefined
  },
  request: <ref *1> ClientRequest {
    _events: [Object: null prototype] {
      abort: [Function (anonymous)],
      aborted: [Function (anonymous)],
      connect: [Function (anonymous)],
      error: [Function (anonymous)],
      socket: [Function (anonymous)],
      timeout: [Function (anonymous)],
      prefinish: [Function: requestOnPrefinish]
    },
    _eventsCount: 7,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    destroyed: false,
    _last: true,
    chunkedEncoding: false,
    shouldKeepAlive: false,
    _defaultKeepAlive: true,
    useChunkedEncodingByDefault: false,
    sendDate: false,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: 0,
    _hasBody: true,
    _trailer: '',
    finished: true,
    _headerSent: true,
    socket: Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'localhost',
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: null,
      _server: null,
      parser: null,
      _httpMessage: [Circular *1],
      [Symbol(async_id_symbol)]: 65,
      [Symbol(kHandle)]: [TCP],
      [Symbol(kSetNoDelay)]: false,
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    _header: 'GET / HTTP/1.1\r\n' +
      'Accept: application/json, text/plain, */*\r\n' +
      'User-Agent: axios/0.21.1\r\n' +
      'Host: localhost:3000\r\n' +
      'Connection: close\r\n' +
      '\r\n',
    _keepAliveTimeout: 0,
    _onPendingData: [Function: noopPendingOutput],
    agent: Agent {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      defaultPort: 80,
      protocol: 'http:',
      options: [Object],
      requests: {},
      sockets: [Object],
      freeSockets: {},
      keepAliveMsecs: 1000,
      keepAlive: false,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      scheduling: 'lifo',
      maxTotalSockets: Infinity,
      totalSocketCount: 1,
      [Symbol(kCapture)]: false
    },
    socketPath: undefined,
    method: 'GET',
    maxHeaderSize: undefined,
    insecureHTTPParser: undefined,
    path: '/',
    _ended: true,
    res: IncomingMessage {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      socket: [Socket],
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      httpVersion: '1.1',
      complete: true,
      headers: [Object],
      rawHeaders: [Array],
      trailers: {},
      rawTrailers: [],
      aborted: false,
      upgrade: false,
      url: '',
      method: null,
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      client: [Socket],
      _consuming: false,
      _dumped: false,
      req: [Circular *1],
      responseUrl: 'http://localhost:3000/',
      redirects: [],
      [Symbol(kCapture)]: false,
      [Symbol(RequestTimeout)]: undefined
    },
    aborted: false,
    timeoutCb: null,
    upgradeOrConnect: false,
    parser: null,
    maxHeadersCount: null,
    reusedSocket: false,
    host: 'localhost',
    protocol: 'http:',
    _redirectable: Writable {
      _writableState: [WritableState],
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _options: [Object],
      _ended: true,
      _ending: true,
      _redirectCount: 0,
      _redirects: [],
      _requestBodyLength: 0,
      _requestBodyBuffers: [],
      _onNativeResponse: [Function (anonymous)],
      _currentRequest: [Circular *1],
      _currentUrl: 'http://localhost:3000/',
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      accept: [Array],
      'user-agent': [Array],
      host: [Array]
    }
  },
  response: {
    status: 500,
    statusText: 'Internal Server Error',
    headers: {
      'x-powered-by': 'Express',
      'content-type': 'text/plain; charset=utf-8',
      'content-length': '21',
      etag: 'W/"15-/6VXivhc2MKdLfIkLcUE47K6aH0"',
      date: 'Wed, 15 Mar 2023 11:46:28 GMT',
      connection: 'close'
    },
    config: {
      url: 'http://localhost:3000',
      method: 'get',
      headers: [Object],
      transformRequest: [Array],
      transformResponse: [Array],
      timeout: 0,
      adapter: [Function: httpAdapter],
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: [Function: validateStatus],
      'axios-retry': [Object],
      data: undefined
    },
    request: <ref *1> ClientRequest {
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
      _last: true,
      chunkedEncoding: false,
      shouldKeepAlive: false,
      _defaultKeepAlive: true,
      useChunkedEncodingByDefault: false,
      sendDate: false,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: 0,
      _hasBody: true,
      _trailer: '',
      finished: true,
      _headerSent: true,
      socket: [Socket],
      _header: 'GET / HTTP/1.1\r\n' +
        'Accept: application/json, text/plain, */*\r\n' +
        'User-Agent: axios/0.21.1\r\n' +
        'Host: localhost:3000\r\n' +
        'Connection: close\r\n' +
        '\r\n',
      _keepAliveTimeout: 0,
      _onPendingData: [Function: noopPendingOutput],
      agent: [Agent],
      socketPath: undefined,
      method: 'GET',
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      path: '/',
      _ended: true,
      res: [IncomingMessage],
      aborted: false,
      timeoutCb: null,
      upgradeOrConnect: false,
      parser: null,
      maxHeadersCount: null,
      reusedSocket: false,
      host: 'localhost',
      protocol: 'http:',
      _redirectable: [Writable],
      [Symbol(kCapture)]: false,
      [Symbol(kNeedDrain)]: false,
      [Symbol(corked)]: 0,
      [Symbol(kOutHeaders)]: [Object: null prototype]
    },
    data: 'Internal Server Error'
  },
  isAxiosError: true,
  toJSON: [Function: toJSON]
}
```

# Axios client configured with interceptor
```javascript
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
```

## Dummy server log
```
2023-03-15T12:04:59.644Z HIT
2023-03-15T12:04:59.886Z HIT
2023-03-15T12:05:00.357Z HIT
2023-03-15T12:05:01.299Z HIT
```

## Axios client log
```
Request failed with status code 500 for GET http://localhost:3000! Retry attempt: 1
Request failed with status code 500 for GET http://localhost:3000! Retry attempt: 2
Request failed with status code 500 for GET http://localhost:3000! Retry attempt: 3
Error: 4: ELSE ERROR: 3: ELSE ERROR: 2: ELSE ERROR:  1: IF ERROR: Internal Server Error
    at errorInterceptor (/home/sinayra/Documents/axios-retry-test/axios-client/index.js:17:27)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
```