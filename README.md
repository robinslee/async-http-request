# async_request

Simply wrapped request with Promise, so you can use async/await of ES7.

## Installation

Using npm:

```
$ npm i -D async_request
```

## Usage

### Resolve with response data
```js
"use strict";

const asyncRequest = require("async_request");
const url = "http://www.google.com";

(async function() {
    // Resolved with response data
    let body = await asyncRequest(url);
    console.log(body);
})();
```

### Resolve with response object, instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
```js
"use strict";

const asyncRequest = require("async_request");
const url = "http://www.google.com";
const resolveWithResponse = true;

(async function() {
    // Resolved with response object
    let response = await asyncRequest({
        url,
        resolveWithResponse
    });
    console.log(response.statusCode);
    console.log(response.headers['content-type']);
})();
```

### Resolve with raw object as same as [request][r] returned

> With this object, you can use all methods that [doc][r] shows

```js
"use strict";

const asyncRequest = require("async_request");
const request = require("request");
const fs = require("fs");

const url = "http://www.google.com";
const resolveWithRequest = true;

(async function() {
    // Resolved with response object
    let oReq = await asyncRequest({
        url,
        resolveWithRequest
    });
    console.log(oReq);

    // Sample 1, pipe stream
    oReq.pipe(fs.createWriteStream("foo.txt"));

    // Sample 2, events
    oReq
        .on("response", function(resp) {
            console.log(resp.statusCode);
        })
        .on("error", function(err) {
            console.log(err);
        });
})();
```

### Error handling, resolve with Error
```js
"use strict";

const asyncRequest = require("async_request");
const url = "http://www.google.com";

(async function() {
    // Something wrong like net work issue
    let err = await asyncRequest(url);
    console.log(err);
})();
```

### Convenience methods of [request][r]
```js
"use strict";

const asyncRequest = require("async_request");
const url = "http://www.google.com";

(async function() {
    // Something wrong like net work issue
    let body_get = await asyncRequest.get(url);
    console.log(body_get);

    let body_post = await asyncRequest.post({
        url,
        form: {
            name: "Foo"
        }
    });
    console.log(body_post);
})();
```

[r]: https://www.npmjs.com/package/request