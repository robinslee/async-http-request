/*!
 * async-promised-request
 * Copyright(c) 2017 Robin Li
 * MIT Licensed
 */

"use strict";

const request = require("request");
const staticMethods = Object.keys(request);
const staticFactoryMethods = [ "defaults", "forerer" ];
const staticHttpMethods = [ "get", "post", "put", "patch", "del", "delete", "head", "options" ];

const AsyncRequest = _wrapRequest();

<<<<<<< HEAD
staticMethods.forEach(method => {
	if (typeof method === "function") {
		if (httpMethods.includes(method)) {
		    AsyncRequest[method] = _wrapRequest(request[method]);
		} else if (factoryMethods.includes(method)) {
		    AsyncRequest[method] = opt => _wrapRequest(request[method](opt));
		} else {
		    AsyncRequest[method] = request[method];
		}
=======
for (let method of staticMethods) {
    if (staticHttpMethods.includes(method)) {
        AsyncRequest[method] = _wrapRequest(request[method]);
    } else if (staticFactoryMethods.includes(method)) {
        AsyncRequest[method] = opt => _wrapRequest(request[method](opt));
    } else {
        AsyncRequest[method] = request[method];
>>>>>>> 609c1f165e1dd0260ad81ae8858077857dcde5d2
    }
}

/**
 * Export a request wrapped with Promise instance
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
            } else if (resolveWithResponse) {
                resolve(response);
            } else {
                resolve(body);
            }
        }));
    });
}
