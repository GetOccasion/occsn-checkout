import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import { Alert } from 'reactstrap';

import occsn from '../../libs/Occasion';

export default class MissingAnswers extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order),
  };

  constructor() {
    super();

    _.bindAll(this,
      'empty',
      'missingRequiredAnswers',
    );
  }

  missingRequiredAnswers(override) {
    let { order } = this.props;

    if(override) order = override;

    return order.answers().target()
    .select((a) => !a.valid());
  };

  empty() {
    return this.missingRequiredAnswers().empty();
  }

  render() {
    if(this.empty()) {
      return null;
    } else {
      return <Alert color="secondary" className="missing-answers">
        <p className="missing-answers-text">Please complete the following fields:</p>
        <ul className="missing-answers-list">
          {
            this.missingRequiredAnswers().map((a) => {
              return <li className="missing-answer">{a.question().title}</li>
            }).toArray()
          }
        </ul>
      </Alert>;
    }
  }
}
