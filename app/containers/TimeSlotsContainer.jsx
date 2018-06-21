import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'underscore';

import { Row, Col } from 'reactstrap';

import { Resource } from 'mitragyna';

import * as appActions from '../actions/appActions';
import * as calendarActions from '../actions/calendarActions';

import occsn from '../libs/Occasion';

import TimeSlotsSelector from '../components/TimeSlotsSelector.jsx';
import Calendar from '../components/TimeSlots/Calendar.jsx';
import Paginator from '../components/TimeSlots/Paginator.jsx';

// Which part of the Redux global state does our component want to receive as props?
function stateToProps(state) {
  return {
    data: {
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
      loadProductCalendar: (product) => dispatch(calendarActions.loadProductCalendar(product)),
      loadProductTimeSlots: (product) => dispatch(calendarActions.loadProductTimeSlots(product)),
      saveOrder: (order) => dispatch(appActions.saveOrder(order)),
      setActiveTimeSlotsCollection: (timeSlots) => dispatch(calendarActions.setActiveTimeSlotsCollection(timeSlots)),
      setTimeSlotsFromCalendar: (timeSlots) => dispatch(calendarActions.setTimeSlotsFromCalendar(timeSlots)),
    }
  };
}

export class TimeSlotsContainer extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    order: PropTypes.instanceOf(occsn.Order),
    onSelect: PropTypes.func,
  };

  componentDidMount() {
    const { actions, data, order } = this.props;

    switch(data.product.timeSlotView) {
      case 'calendar':
        actions.loadProductCalendar(data.product);
        break;
      case 'list':
        if(data.product.requiresTimeSlotSelection) actions.loadProductTimeSlots(data.product);
        break;
    }

    if(data.product.sellsSessions) {
      actions.setActiveTimeSlotsCollection(order.timeSlots().target().clone())
    }
  }

  render() {
    const { data } = this.props;

    return <section>
      {
        data.activeTimeSlotsCollection.empty() ? (
          this.renderLoadingScreen()
        ) : (
          this.renderTimeSlotsScreen()
        )
      }
    </section>;
  }

  renderLoadingScreen() {
    return <section>
        <p>Loading...</p>
    </section>;
  }

  renderTimeSlotsScreen() {
    const { actions, data, order } = this.props;

    switch(data.product.timeSlotView) {
      case 'calendar':
        return <section className="mt-3">
          <Row>
            <Col xs="9">
              <h3>{ data.activeTimeSlotsCollection.first().day.format('MMMM YYYY') }</h3>
            </Col>
            <Col xs="3">
              <Paginator className="float-right" onChange={actions.setActiveTimeSlotsCollection} timeSlotsCollection={data.activeTimeSlotsCollection} />
            </Col>
          </Row>
          <Calendar onDateSelect={actions.setTimeSlotsFromCalendar} calendarTimeSlots={data.activeTimeSlotsCollection}/>
          <TimeSlotsSelector onSelect={actions.saveOrder} subject={order} timeSlots={data.timeSlotsFromCalendar} />
        </section>;
      case 'list':
        return <section className="mt-3">
          {
            data.product.sellsSessions ? (
              <p>Sessions are purchased together</p>
            ) : (null)
          }
          <TimeSlotsSelector disabled={data.product.sellsSessions} onSelect={actions.saveOrder} subject={order} timeSlots={data.activeTimeSlotsCollection} />
          {
            !data.product.sellsSessions ? (
              <Row>
                <Col xs={{ offset: "9" }}>
                </Col>
                <Col xs="3">
                  <Paginator className="float-right" onChange={actions.setActiveTimeSlotsCollection} timeSlotsCollection={data.activeTimeSlotsCollection} />
                </Col>
              </Row>
            ) : (null)
          }
        </section>;
    }
  }
}

// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(stateToProps, dispatchToProps)(TimeSlotsContainer);
