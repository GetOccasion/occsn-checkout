import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classnames from 'classnames';

import _ from 'underscore';

import { Container, Row, Col } from 'reactstrap';

import { Resource } from 'mitragyna';

import ActiveResource from 'active-resource';
import Occasion from 'occasion-sdk';

import * as appActions from '../actions/appActions';

import '../styles/index.scss'

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
      skipAttendees: state.$$appStore.get('skipAttendees').toObject(),
      order: state.$$appStore.get('order'),
      product: state.$$appStore.get('product'),
      productNotFoundError: state.$$appStore.get('productNotFoundError'),
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
      setSkipAttendee: (attendee, skip) => dispatch(appActions.setSkipAttendee(attendee, skip))
    }
  }
}

export class AppContainer extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    callbacks: PropTypes.shape({
      onBookOrderButtonRender: PropTypes.func,
      onDateSelect: PropTypes.func,
      onOrderComplete: PropTypes.func,
      onOrderChange: PropTypes.func,
      onMissingAnswerClicked: PropTypes.func,
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
    spreedlyIframeInputStyles: PropTypes.object,
    squareIframeInputStyles: PropTypes.object,
    config: PropTypes.object,
  };

  static childContextTypes = {
    callbackProps: PropTypes.object,
    componentProps: PropTypes.object,
    formatProps: PropTypes.object,
  };

  constructor(props) {
    const { config } = props

    super(props);

    // If config variables are set via props, set globals to correct ones
    // TODO: Reomve window.OCCSN and use a Context to pass down settings instead
    if(config) { window.OCCSN = config; }


  


    // let options = {
    //   token: window.OCCSN.api_key,
    //   immutable: true
    // };
    //
    // let url = window.OCCSN.host_url;
    // if(url != undefined) {
    //   options.baseUrl = ActiveResource.prototype.Links.__constructLink(url, 'api', 'v1');
    // }
    //
    // var occsn = Occasion.Client(options);
  }

  componentDidMount() {
    const { actions, callbacks } = this.props;

    actions.loadProduct();

    if(callbacks && callbacks.onOrderChange) {
      this.onOrderChange = _.debounce(callbacks.onOrderChange, 25);
    }

    if(callbacks && callbacks.onOrderComplete) {
      this.onOrderComplete = _.debounce(callbacks.onOrderComplete, 25);
    }

    if(callbacks && callbacks.onPersonalInformationComplete) {
      this.onPersonalInformationComplete = _.once(callbacks.onPersonalInformationComplete);
    }
  }

  // @todo Only execute the relevant parts based on the props that actually changed
  componentWillReceiveProps(nextProps) {
    const { actions, callbacks, data } = this.props;

    if(nextProps.data.order != null) {
      if(data.order == null) {
        actions.saveOrder(nextProps.data.order);
        this.checkPrefilledAttributes(nextProps.data.product);
      }

      if(this.onOrderChange) this.onOrderChange(nextProps.data.order);
      if(this.onOrderComplete && nextProps.data.order.status == 'booked') {
        this.onOrderComplete(nextProps.data.order);
      }

      if(this.onPersonalInformationComplete) {
        let order = nextProps.data.order;

        if(order.customer().complete() &&
          !order.answers().target().detect((a) => !a.valid()) &&
          !order.attendees().target().detect((a, index) => !(a.complete() || nextProps.data.skipAttendees[index])) &&
          nextProps.data.order.status == 'initialized'
        ) {
          this.onPersonalInformationComplete(nextProps.data.order);
        }
      }
    }

    if(data.product == null && nextProps.data.product != null) {
      if(callbacks && callbacks.onProductLoad) callbacks.onProductLoad(nextProps.data.product);
    } else if(data.productNotFoundError) {
      if(callbacks && callbacks.onProductNotFound) callbacks.onProductNotFound(data.productNotFoundError);
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

  renderLoadingScreen = () => {
    const { components } = this.props;

    var loadingComponent;

    if(components && components.orderLoading) {
      loadingComponent = React.createElement(components.orderLoading);
    }

    return <section className="order-loading">
      {loadingComponent}
    </section>;
  }

  renderBookingScreen = () => {
    const { actions, data, className, formRef, spreedlyIframeInputStyles, squareIframeInputStyles } = this.props;

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
            saveOrder: actions.saveOrder,
            savingOrder: data.savingOrder,
            setSkipAttendee: actions.setSkipAttendee,
            skipAttendees: data.skipAttendees,
            timeSlotsFromCalendar: data.timeSlotsFromCalendar,
            spreedlyIframeInputStyles,
            squareIframeInputStyles
          } }
          componentRef={formRef}
          onSubmit={ actions.bookOrder }
          onInvalidSubmit={ actions.setOrder }
          subject={ data.order }
        ></Resource>
      ) : (null)}
    </section>;
  }

  renderCompleteScreen = () => {
    const { data } = this.props;

    return <OrderComplete order={data.order}></OrderComplete>;
  }

  checkPrefilledAttributes = (product) => {
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

  setPrefilledAttributes = (prefills) => {
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
