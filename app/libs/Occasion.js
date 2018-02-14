import ActiveResource from 'active-resource';
import Occasion from 'occasion-sdk';

let options = {
  token: window.OCCSN.api_key
};

let url = window.OCCSN.host_url;
if(url != undefined) {
  options.baseUrl = ActiveResource.prototype.Links.__constructLink(url, 'api', 'v1');
}

var occsn = Occasion.Client(options);

export default occsn;
