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

axiosMock.__requests = [];

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
              if(mockResponses.hasOwnProperty(k) && options.url.indexOf(k) > -1) {
                response = mockResponses[k];
              }
            }

            resolve(response);
          }
        }, mockDelay);
      });

      axiosMock.__requests.push(request);

      return request;
    }
  };
};

axiosMock.create.mockImplementation(create);

axiosMock.getLastRequest = () => { axiosMock.__requests[axiosMock.__requests.length - 1] };
axiosMock._setMockError = (mE) => { mockError = mE };
axiosMock._setMockResponses = (mR) => { mockResponses = mR };
axiosMock._setDelay = (mD) => { mockDelay = mD };
axiosMock.wait = (c) => { setTimeout(c, mockDelay) };

module.exports = axiosMock;
