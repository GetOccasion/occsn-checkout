import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ActiveResource from 'active-resource';
import s from 'underscore.string';
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

    let missingAnswers = ActiveResource.Collection.build();

    ActiveResource.Collection.build(['email', 'firstName', 'lastName', 'zip'])
      .select((q) => !order.customer()[q])
      .each((q) => missingAnswers.push('Customer ' + s.titleize(s.humanize(q))));

    order.answers().target()
      .select((a) => !a.valid())
      .each((a) => missingAnswers.push(a.question().title));

    return missingAnswers;
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
              return <li className="missing-answer">{a}</li>
            }).toArray()
          }
        </ul>
      </Alert>;
    }
  }
}
