import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'underscore';

import { Container, Row, Col } from 'reactstrap';

import { Resource } from 'mitragyna';

import * as appActions from '../actions/appActions';

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
              afterError={ actions.setOrder }
              afterUpdate={ actions.setOrder }
              component={ Order }
              componentProps={ {
                findRedeemable: actions.findRedeemable,
                saveOrder: actions.saveOrder,
                activeTimeSlotsCollection: data.activeTimeSlotsCollection,
                timeSlotsFromCalendar: data.timeSlotsFromCalendar
              } }
              onSubmit={ actions.bookOrder }
              onInvalidSubmit={ actions.setOrder }
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
