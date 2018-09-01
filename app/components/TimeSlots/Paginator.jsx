import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import _ from 'underscore';

export default class Paginator extends PureComponent {
  static propTypes = {
    cached: PropTypes.bool,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    preloadPages: PropTypes.number,
    timeSlotsCollection: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.any)
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      cachedPages: [],
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let { cachedPages } = this.state;
    const { cached, preloadPages, timeSlotsCollection } = this.props;

    if(cached && cachedPages.length == 0 && !nextProps.timeSlotsCollection.empty()) {
      cachedPages.push(nextProps.timeSlotsCollection);
      this.loadNextTimeSlotPages(preloadPages, nextProps.timeSlotsCollection);
    }
  }

  nextClicked = () => {
    const { cached, onChange, preloadPages, timeSlotsCollection } = this.props;
    let { currentPage, cachedPages, loading } = this.state;

    this.setState({currentPage: ++currentPage});
    if(cached && cachedPages[currentPage]){
      if(!loading && (cachedPages.length <= currentPage + preloadPages/2)) {
        this.loadNextTimeSlotPages(preloadPages, cachedPages[cachedPages.length - 1]);
      }
      onChange(cachedPages[currentPage])
    } else {
      timeSlotsCollection.nextPage()
      .then((nextTimeSlotsCollection) => {
        onChange(nextTimeSlotsCollection);
      });
    }
  };

  prevClicked = () => {
    const { cached, onChange, timeSlotsCollection } = this.props;
    let { currentPage, cachedPages } = this.state;

    this.setState({currentPage: --currentPage});

    if(cached) {
      onChange(cachedPages[currentPage]);
    } else {
      timeSlotsCollection.prevPage()
      .then((prevTimeSlotsCollection) => {
        onChange(prevTimeSlotsCollection);
      });
    }
  };

  loadNextTimeSlotPages = (numberOfPages, collection) => {
    if(numberOfPages === 0 || !collection.hasNextPage()) return;

    let { cachedPages } = this.state;

    this.setState({loading: true});

    collection.nextPage()
    .then((nextPage) => {
      cachedPages.push(nextPage);
      this.setState({loading: false});

      if(numberOfPages) {
        this.loadNextTimeSlotPages(numberOfPages - 1, nextPage);
      }
    })
  };

  render() {
    let { className, timeSlotsCollection } = this.props;
    let { currentPage, cachedPages, loading } = this.state;

    return <section className="time-slots-paginator">
      <Pagination className={className}>
        <PaginationItem disabled={currentPage == 0}>
          <PaginationLink previous onClick={this.prevClicked}/>
        </PaginationItem>
        <PaginationItem disabled={!timeSlotsCollection.hasNextPage() || (loading && (currentPage >= cachedPages.length - 1)) }>
          <PaginationLink next onClick={this.nextClicked} />
        </PaginationItem>
      </Pagination>
    </section>;
  }
}
