import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'underscore';

import { Container, Row, Col } from 'reactstrap';

import { Resource } from 'mitragyna';

import { bookOrder, loadProduct, saveOrder, setOrder } from '../actions/appActions';
import { loadProductTimeSlots } from '../actions/calendarActions';

import '../styles/index.css'

import Header from '../components/Header';
import Order from '../components/Order';
import OrderComplete from '../components/Order/Complete';

// Which part of the Redux global state does our component want to receive as props?
function stateToProps(state) {
  return {
    data: {
      order: state.$$appStore.get('order'),
      product: state.$$appStore.get('product'),
      selectedTimeSlots: state.$$calendarStore.get('selectedTimeSlots'),
    }
  };
}

// Bind relevant action creators and map them to properties
function dispatchToProps(dispatch) {
  return {
    actions: {
      bookOrder: (order) => dispatch(bookOrder(order)),
      loadProduct: () => dispatch(loadProduct(window.OCCSN.product_id)),
      loadProductTimeSlots: (product) => dispatch(loadProductTimeSlots(product)),
      saveOrder: (order) => dispatch(saveOrder(order)),
      setOrder: (order) => dispatch(setOrder(order))
    }
  }
}

export class AppContainer extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    _.bindAll(this,
      'renderBookingScreen',
      'renderCompleteScreen',
      'renderLoadingScreen',
    )
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadProduct();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, data } = this.props;

    if(data.product == null && nextProps.data.product != null) {
      actions.loadProductTimeSlots(nextProps.data.product);
    }

    if(data.order == null && nextProps.data.order != null) {
      actions.saveOrder(nextProps.data.order);
    }
  }

  render() {
    const { actions, data } = this.props;

    let body;
    if(data.product) {
      if(data.order != null && data.order.status == 'booked') {
        body = this.renderCompleteScreen();
      } else {
        body = this.renderBookingScreen();
      }
    } else {
      body = this.renderLoadingScreen();
    }

    return <Container>
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          { body }
        </Col>
      </Row>
    </Container>;
  }

  renderLoadingScreen() {
    return <section>
        <p>Loading...</p>
    </section>;
  }

  renderBookingScreen() {
    const { actions, data } = this.props;

    return <section>
      <Row>
        <Col>
          <Header product={ data.product }></Header>
        </Col>
      </Row>
      { data.order ? (
        <Row>
          <Col>
            <Resource
              afterUpdate={ actions.setOrder }
              component={ Order }
              componentProps={ { selectedTimeSlots: data.selectedTimeSlots } }
              onSubmit={ actions.bookOrder }
              subject={ data.order }
            ></Resource>
          </Col>
        </Row>
      ) : (null)}
    </section>;
  }

  renderCompleteScreen() {
    const { data } = this.props;

    return <OrderComplete order={ data.order}></OrderComplete>;
  }
}

// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(stateToProps, dispatchToProps)(AppContainer);
