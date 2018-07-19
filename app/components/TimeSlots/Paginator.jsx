import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paginator extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    cached: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    timeSlotsCollection: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.any)
    }).isRequired,
  };

  nextClicked = () => {
    const { onChange, timeSlotsCollection } = this.props;

    timeSlotsCollection.nextPage()
    .then((nextTimeSlotsCollection) => {
      onChange(nextTimeSlotsCollection);
    });
  }

  prevClicked = () => {
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
