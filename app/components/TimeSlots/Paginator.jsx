import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paginator extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    timeSlotsCollection: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.any)
    }).isRequired,
  };

  constructor() {
    super();

    _.bindAll(this,
      'nextClicked',
      'prevClicked'
    );
  }

  nextClicked() {
    const { onChange, timeSlotsCollection } = this.props;

    timeSlotsCollection.nextPage()
    .then((nextTimeSlotsCollection) => {
      onChange(nextTimeSlotsCollection);
    });
  }

  prevClicked() {
    const { onChange, timeSlotsCollection } = this.props;

    timeSlotsCollection.prevPage()
    .then((prevTimeSlotsCollection) => {
      onChange(prevTimeSlotsCollection);
    });
  }

  render() {
    let { className, timeSlotsCollection } = this.props;

    return <section className="time-slots-paginator">
      <Pagination className={className}>
        <PaginationItem disabled={!timeSlotsCollection.hasPrevPage()}>
          <PaginationLink previous onClick={this.prevClicked}/>
        </PaginationItem>
        <PaginationItem disabled={!timeSlotsCollection.hasNextPage()}>
          <PaginationLink next onClick={this.nextClicked} />
        </PaginationItem>
      </Pagination>
    </section>;
  }
}
