/*!
 * async-promise-request
 * Copyright(c) 2017 Robin Li
 * MIT Licensed
 */

"use strict";

const request = require("request");
const staticMethods = Object.keys(request);
const factoryMethods = [ "defaults", "forerer" ];
const httpMethods = [ "get", "post", "put", "patch", "del", "delete", "head", "options" ];

const AsyncRequest = _wrapRequest();

staticMethods.forEach(method => {
    if (httpMethods.includes(method)) {
        AsyncRequest[method] = _wrapRequest(request[method]);
    } else if (factoryMethods.includes(method)) {
        AsyncRequest[method] = opt => _wrapRequest(request[method](opt));
    } else {
        AsyncRequest[method] = request[method];
    }
});

/**
 * Export a request wrapped with a Promise instance
 *
 * @type {Function}
 */
module.exports = AsyncRequest;

/**
 * Wrap request with a Promise instance
 *
 * @param {Function} doRequest
 * @return {Function}
 */
function _wrapRequest(doRequest = request) {
    return (opt, ...args) => new Promise((resolve, reject) => {
        let resolveWithResponse = opt && opt.resolveWithResponse;
        delete opt.resolveWithResponse;

        doRequest(opt, ...args.concat((error, response, body) => {
            if (error) {
                reject(error);
            }
            if (resolveWithResponse) {
                resolve(response);
            }
            resolve(body);
        }));
    });
}