import React from 'react';

import { Label } from 'reactstrap';

export default class CardNumber extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div>
      <Label>CVV</Label>
      <div id="spreedly-cvv" style={{ height: '52px' }}></div>
    </div>;
  }
}
