import ActiveResource from 'active-resource';
import Occasion from 'occasion-sdk';

const setOptions = () => {
  if (window.OCCSN) {
      let options = {
    token: window.OCCSN.api_key,
    immutable: true
  };

    let url = window.OCCSN.host_url;
    if(url != undefined) {
      options.baseUrl = ActiveResource.prototype.Links.__constructLink(url, 'api', 'v1');
    }
  }

  return options
}

var occsn = Occasion.Client(setOptions());

export default occsn;
