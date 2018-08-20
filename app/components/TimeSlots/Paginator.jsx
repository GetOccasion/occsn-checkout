import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paginator extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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

  componentDidMount() {
    const { timeSlotsCollection } = this.props;
    this.loadNextTimeSlotPages(9, timeSlotsCollection);
  }

  nextClicked = () => {
    const { timeSlotsCollection, onChange } = this.props;
    let { currentPage, cachedPages, loading } = this.state;

    this.setState({currentPage: ++currentPage})
    if(cachedPages[currentPage]){
      if(!loading && (cachedPages.length < currentPage + 5)) {
        this.loadNextTimeSlotPages(5, cachedPages[cachedPages.length - 1]);
      }
      onChange(cachedPages[currentPage])
    }
  }

  prevClicked = () => {
    const { onChange } = this.props;
    let { currentPage, cachedPages } = this.state;

    this.setState({currentPage: --currentPage});
    onChange(cachedPages[currentPage])
  }

  loadNextTimeSlotPages = (numberOfPages, collection, callback) => {
    let { cachedPages } = this.state;

    this.setState({loading: true});
    collection.nextPage()
    .then((nextPage) => {
      cachedPages.push(nextPage);
      this.setState({loading: false});

      if(numberOfPages) {
        this.loadNextTimeSlotPages(numberOfPages - 1, nextPage, callback);
      } else {
        if(callback !== undefined) callback();
      }
    })
  }

  render() {
    let { className, timeSlotsCollection } = this.props;
    let { currentPage, cachedPages, loading } = this.state

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
