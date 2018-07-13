import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classnames from 'classnames';

import _ from 'underscore';

import { Container, Row, Col } from 'reactstrap';

import { Resource } from 'mitragyna';

import occsn from '../libs/Occasion';

import * as appActions from '../actions/appActions';

import '../styles/index.css'

import Header from '../components/Header.jsx';
import Order from '../components/Order.jsx';
import OrderComplete from '../components/Order/Complete.jsx';

// Which part of the Redux global state does our component want to receive as props?
function stateToProps(state) {
  return {
    data: {
      bookingOrder: state.$$appStore.get('bookingOrder'),
      savingOrder: state.$$appStore.get('savingOrder'),
      loadingProduct: state.$$appStore.get('loadingProduct'),
      skipAttendees: state.$$appStore.get('skipAttendees'),
      order: state.$$appStore.get('order'),
      product: state.$$appStore.get('product'),
      productNotFound: state.$$appStore.get('productNotFound'),
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
      setOrder: (order) => dispatch(appActions.setOrder(order)),
      setSkipAttendees: (skip) => dispatch(appActions.setSkipAttendees(skip))
    }
  }
}

export class AppContainer extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    callbacks: PropTypes.shape({
      onDateSelect: PropTypes.func,
      onOrderComplete: PropTypes.func,
      onOrderChange: PropTypes.func,
      onPersonalInformationComplete: PropTypes.func,
      onProductLoad: PropTypes.func,
      onProductNotFound: PropTypes.func,
      onTimeSelect: PropTypes.func,
    }),
    components: PropTypes.shape({
      orderBooking: PropTypes.func,
      orderLoading: PropTypes.func,
      timeSlotsLoading: PropTypes.func,
    }),
    data: PropTypes.object.isRequired,
    format: PropTypes.shape({
      calendarTimeSlotsSelector: PropTypes.string,
      listTimeSlotsSelector: PropTypes.string,
    }),
    formRef: PropTypes.func,
  };

  static childContextTypes = {
    callbackProps: PropTypes.object,
    componentProps: PropTypes.object,
    formatProps: PropTypes.object,
  };

  constructor(props) {
    super(props);

    _.bindAll(this,
      'renderBookingScreen',
      'renderCompleteScreen',
      'renderLoadingScreen',
      'checkPrefilledAttributes',
      'setPrefilledAttributes',
    )
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.loadProduct();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, callbacks, data } = this.props;

    if(nextProps.data.order != null) {
      if(data.order == null) {
        actions.saveOrder(nextProps.data.order);
        this.checkPrefilledAttributes(nextProps.data.product);
      }

      if(callbacks && callbacks.onOrderChange) callbacks.onOrderChange(nextProps.data.order);
      if(callbacks && callbacks.onOrderComplete && nextProps.data.order.status == 'booked') {
        callbacks.onOrderComplete(nextProps.data.order);
      }

      if(callbacks && callbacks.onPersonalInformationComplete) {
        let order = nextProps.data.order;

        if(order.customer().complete() &&
          !order.answers().target().detect((a) => !a.valid()) &&
          (nextProps.data.skipAttendees || !order.attendees().target().detect((a) => !a.complete()))
        ) {
          callbacks.onPersonalInformationComplete(nextProps.data.order);
        }
      }
    }

    if(data.product == null && nextProps.data.product != null) {
      if(callbacks && callbacks.onProductLoad) callbacks.onProductLoad(nextProps.data.product);
    } else if(data.productNotFound) {
      if(callbacks && callbacks.onProductNotFound) callbacks.onProductNotFound();
    }
  }

  getChildContext() {
    return {
      callbackProps: this.props.callbacks || {},
      componentProps: this.props.components || {},
      formatProps: this.props.format || {},
    }
  }

  render() {
    const { actions, data } = this.props;

    if(data.product) {
      if(data.order != null && data.order.status == 'booked') {
        return this.renderCompleteScreen();
      } else {
        return this.renderBookingScreen();
      }
    } else {
      return this.renderLoadingScreen();
    };
  }

  renderLoadingScreen() {
    const { components } = this.props;

    var loadingComponent;

    if(components && components.orderLoading) {
      loadingComponent = React.createElement(components.orderLoading);
    }

    return <section className="order-loading">
      {loadingComponent}
    </section>;
  }

  renderBookingScreen() {
    const { actions, data, className, formRef } = this.props;

    let classNames = classnames(
      'occsn-app-container',
      className
    );

    return <section className={classNames}>
      { data.order ? (
        <Resource
          afterError={ actions.setOrder }
          afterUpdate={ actions.saveOrder }
          component={ Order }
          componentProps={ {
            activeTimeSlotsCollection: data.activeTimeSlotsCollection,
            bookingOrder: data.bookingOrder,
            findRedeemable: actions.findRedeemable,
            setSkipAttendees: actions.setSkipAttendees,
            skipAttendees: data.skipAttendees,
            timeSlotsFromCalendar: data.timeSlotsFromCalendar
          } }
          componentRef={formRef}
          onSubmit={ actions.bookOrder }
          onInvalidSubmit={ actions.setOrder }
          subject={ data.order }
        ></Resource>
      ) : (null)}
    </section>;
  }

  renderCompleteScreen() {
    const { data } = this.props;

    return <OrderComplete order={data.order}></OrderComplete>;
  }

  checkPrefilledAttributes(product) {
    const { actions } = this.props;

    let promises = [];

    if(window.OCCSN.coupon_code) {
      promises.push(new Promise((resolve) => {
        actions.findRedeemable(
          product,
          window.OCCSN.coupon_code,
          (coupon) => resolve(coupon),
          null
        )
      }));
    } else {
      promises.push(new Promise((resolve) => resolve()));
    }

    if(window.OCCSN.time_slot_id) {
      promises.push(
        product.timeSlots()
        .includes({ product: 'merchant' })
        .where({ status: 'bookable' })
        .find(window.OCCSN.time_slot_id)
      );
    }

    if(promises.size == 0) return;

    Promise.all(promises).then(this.setPrefilledAttributes);
  }

  setPrefilledAttributes(prefills) {
    const { actions, data } = this.props;

    let attributes = {};

    if(prefills[0]) {
      attributes.coupon = prefills[0];
    }

    if(prefills[1]) {
      attributes.timeSlots = [prefills[1]];
    }

    if(attributes == {}) return;

    actions.saveOrder(data.order.assignAttributes(attributes));
  };
}

// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(stateToProps, dispatchToProps)(AppContainer);
