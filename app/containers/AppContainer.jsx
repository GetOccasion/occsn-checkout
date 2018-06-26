import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'underscore';

import { Container, Row, Col } from 'reactstrap';

import { Resource } from 'mitragyna';

import * as appActions from '../actions/appActions';

import '../styles/index.css'

import Header from '../components/Header.jsx';
import Order from '../components/Order.jsx';
import OrderComplete from '../components/Order/Complete.jsx';

// Which part of the Redux global state does our component want to receive as props?
function stateToProps(state) {
  return {
    data: {
      order: state.$$appStore.get('order'),
      product: state.$$appStore.get('product'),
      activeTimeSlotsCollection: state.$$calendarStore.get('activeTimeSlotsCollection'),
      timeSlotsFromCalendar: state.$$calendarStore.get('timeSlotsFromCalendar'),
    }
  };
}

// Bind relevant action creators and map them to properties
function dispatchToProps(dispatch) {
  return {
    actions: {
      bookOrder: (order) => dispatch(appActions.bookOrder(order)),
      findRedeemable: (product, code, onSuccess, onError) => dispatch(appActions.findRedeemable(product, code, onSuccess, onError)),
      loadProduct: () => dispatch(appActions.loadProduct(window.OCCSN.product_id)),
      saveOrder: (order) => dispatch(appActions.saveOrder(order)),
      setOrder: (order) => dispatch(appActions.setOrder(order))
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

    console.log(props);

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
      { body }
    </Container>;
  }

  renderLoadingScreen() {
    return <section className="order-loading">
        <p>Loading...</p>
    </section>;
  }

  renderBookingScreen() {
    const { actions, data } = this.props;

    return <section className="occsn-app-container">
      { data.order ? (
        <Resource
          afterError={ actions.setOrder }
          afterUpdate={ actions.saveOrder }
          component={ Order }
          componentProps={ {
            findRedeemable: actions.findRedeemable,
            activeTimeSlotsCollection: data.activeTimeSlotsCollection,
            timeSlotsFromCalendar: data.timeSlotsFromCalendar
          } }
          onSubmit={ actions.bookOrder }
          onInvalidSubmit={ actions.setOrder }
          subject={ data.order }
        ></Resource>
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
