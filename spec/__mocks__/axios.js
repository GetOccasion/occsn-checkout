'use strict';
var mockDelay = 1;
var mockError;
var defaultResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
var mockResponses = [];

var axiosMock = jest.genMockFromModule('axios');

axiosMock.requests = [];

function create() {
  return {
    request: (options) => {
      var request = new Promise(function(resolve, reject) {
        axiosMock.delayTimer = setTimeout(function() {
          if (mockError) {
            reject(mockError);
          } else {
            var response = defaultResponse;

            for(var k in mockResponses) {
              var resources = k.split(':id');
              resources[resources.length - 1] += '$';
              var regexp = new RegExp(resources.join('([^\/]+)'));

              if(mockResponses.hasOwnProperty(k) && options.url.match(regexp)) {
                response = mockResponses[k];
              }
            }

            resolve(response);
          }
        }, mockDelay);
      });

      debugger;
      var requestData = {
        ...options,
        promise: request
      };
      axiosMock.requests.push(requestData);

      return request;
    }
  };
};

axiosMock.create.mockImplementation(create);

axiosMock.getLastRequest = () => { return axiosMock.requests[axiosMock.requests.length - 1] };
axiosMock._setMockError = (mE) => { mockError = mE };
axiosMock._setMockResponses = (mR) => { mockResponses = mR };
axiosMock._setDelay = (mD) => { mockDelay = mD };
axiosMock.wait = (t) => { new Promise((r) => { setTimeout(() => { r() }, t || mockDelay) }) };

module.exports = axiosMock;
