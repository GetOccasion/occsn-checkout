'use strict';
var mockDelay = 1;
var mockError;
var mockResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

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
            resolve(mockResponse);
          }
        }, mockDelay);
      });

      axiosMock.__requests.push(request);

      return request;
    }
  };
};

axiosMock.create.mockImplementation(create);

axiosMock.getLastRequest = () => { return axiosMock.__requests[axiosMock.__requests.length - 1] }
axiosMock._setMockError = (mE) => { mockError = mE };
axiosMock._setMockResponse = (mR) => { mockResponse = mR };
axiosMock._setDelay = (mD) => { mockDelay = mD };
axiosMock.finishRequest = () => { jest.runOnlyPendingTimers() };

module.exports = axiosMock;
