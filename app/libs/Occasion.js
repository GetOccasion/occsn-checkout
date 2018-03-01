import ActiveResource from 'active-resource';
import Occasion from 'occasion-sdk';

import moment from 'moment';
import 'moment-timezone';


let options = {
  token: window.OCCSN.api_key,
  immutable: true
};

let url = window.OCCSN.host_url;
if(url != undefined) {
  options.baseUrl = ActiveResource.prototype.Links.__constructLink(url, 'api', 'v1');
}

var occsn = Occasion.Client(options);

// Wrap SDK dates in Moment.js objects
occsn.Product.afterRequest(function() {
  if(this.firstTimeSlotStartsAt != null) {
    this.firstTimeSlotStartsAt = moment(this.firstTimeSlotStartsAt).tz(this.merchant().timeZone);
  }
});

occsn.TimeSlot.afterRequest(function() {
  this.startsAt = moment(this.startsAt);
});

export default occsn;
