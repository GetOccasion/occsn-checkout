import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Row, Col } from 'reactstrap'

import * as appActions from '../actions/appActions'
import * as calendarActions from '../actions/calendarActions'

import occsn from '../libs/Occasion'

import TimeSlotsSelector from '../components/TimeSlotsSelector.jsx'
import Calendar from '../components/TimeSlots/Calendar.jsx'
import Paginator from '../components/TimeSlots/Paginator.jsx'

// Which part of the Redux global state does our component want to receive as props?
function stateToProps(state) {
  return {
    data: {
      product: state.$$appStore.get('product'),
      activeTimeSlotsCollection: state.$$calendarStore.get('activeTimeSlotsCollection'),
      timeSlotsFromCalendar: state.$$calendarStore.get('timeSlotsFromCalendar')
    }
  }
}

// Bind relevant action creators and map them to properties
function dispatchToProps(dispatch) {
  return {
    actions: {
      loadProductCalendar: product => dispatch(calendarActions.loadProductCalendar(product)),
      loadProductTimeSlots: product => dispatch(calendarActions.loadProductTimeSlots(product)),
      saveOrder: order => dispatch(appActions.saveOrder(order)),
      setOrder: order => dispatch(appActions.setOrder(order)),
      setActiveTimeSlotsCollection: timeSlots =>
        dispatch(calendarActions.setActiveTimeSlotsCollection(timeSlots)),
      setTimeSlotsFromCalendar: timeSlots =>
        dispatch(calendarActions.setTimeSlotsFromCalendar(timeSlots))
    }
  }
}

export class TimeSlotsContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    order: PropTypes.instanceOf(occsn.Order),
    onSelect: PropTypes.func
  }

  static contextTypes = {
    callbackProps: PropTypes.object,
    componentProps: PropTypes.object
  }

  componentDidMount() {
    const { actions, data, order } = this.props

    switch (data.product.timeSlotView) {
      case 'calendar':
        actions.loadProductCalendar(data.product)
        break
      case 'list':
        if (data.product.requiresTimeSlotSelection) actions.loadProductTimeSlots(data.product)
        break
    }

    if (data.product.sellsSessions) {
      actions.setActiveTimeSlotsCollection(
        order
          .timeSlots()
          .target()
          .clone()
      )
    }
  }

  onDateSelect = timeSlotsFromCalendar => {
    const { actions } = this.props
    const { callbackProps } = this.context

    if (callbackProps.onDateSelect) callbackProps.onDateSelect(timeSlotsFromCalendar)

    actions.setTimeSlotsFromCalendar(timeSlotsFromCalendar)
  }

  onTimeSelect = order => {
    const { actions } = this.props
    const { callbackProps } = this.context

    if (callbackProps.onTimeSelect) callbackProps.onTimeSelect(order)

    actions.setOrder(order)
    actions.saveOrder(order)
  }

  render() {
    const { data } = this.props

    return <section className="time-slots">{this.renderTimeSlotsScreen()}</section>
  }

  renderLoadingScreen() {
    const { componentProps } = this.context

    var loadingComponent

    if (componentProps.timeSlotsLoading) {
      loadingComponent = React.createElement(componentProps.timeSlotsLoading)
    }

    return <section className="time-slots-loading">{loadingComponent}</section>
  }

  renderTimeSlotsScreen() {
    const { actions, data, order } = this.props

    switch (data.product.timeSlotView) {
      case 'calendar':
        return (
          <section className="calendar-view">
            <Row>
              <Col xs="9">
                <h3>
                  {data.activeTimeSlotsCollection.first() &&
                    data.activeTimeSlotsCollection.first().day.format('MMMM YYYY')}
                </h3>
              </Col>
              <Col xs="3">
                <Paginator
                  className="float-right"
                  onChange={actions.setActiveTimeSlotsCollection}
                  timeSlotsCollection={data.activeTimeSlotsCollection}
                />
              </Col>
            </Row>
            <Calendar
              onDateSelect={this.onDateSelect}
              calendarTimeSlots={data.activeTimeSlotsCollection}
            />
            <a name="time-slots-selector" id="time-slots-selector-anchor" />
            {data.timeSlotsFromCalendar.first() ? (
              <h3 className="calendar-date-selected">
                {data.timeSlotsFromCalendar.first().startsAt.format('dddd, MMMM Do')}
              </h3>
            ) : null}
            <TimeSlotsSelector
              calendar={true}
              onSelect={this.onTimeSelect}
              showAvailability={data.product.showOccurrenceAvailability}
              subject={order}
              timeSlots={data.timeSlotsFromCalendar}
            />
            {data.activeTimeSlotsCollection.empty() ? this.renderLoadingScreen() : null}
          </section>
        )
      case 'list':
        return (
          <section className="list-view">
            {data.product.sellsSessions ? <p>Sessions are purchased together</p> : null}
            {data.product.sellsDropIns && <p>Select the time slots you want to add:</p>}
            <a name="time-slots-selector" id="time-slots-selector-anchor" />
            <TimeSlotsSelector
              disabled={data.product.sellsSessions}
              onSelect={this.onTimeSelect}
              showAvailability={data.product.showOccurrenceAvailability}
              subject={order}
              timeSlots={data.activeTimeSlotsCollection}
            />

            {data.product.dropInsDiscountPercentage &&
            data.product.dropInsDiscountDaysThreshold - order.timeSlots().size() >= 0 ? (
              <div className="drop-ins-discount alert alert-secondary">
                {order.dropInsDiscountAppliesToWholeOrder ? (
                  <>
                    Get <strong>{data.product.dropInsDiscountPercentage}%</strong> discount
                  </>
                ) : (
                  <>An automatic discount is applied</>
                )}
                {order.timeSlots().size() == 0 ? (
                  <>
                    {' '}
                    when you select {data.product.dropInsDiscountDaysThreshold + 1} or more dates
                  </>
                ) : (
                  <>
                    {' '}
                    when you select{' '}
                    {data.product.dropInsDiscountDaysThreshold - order.timeSlots().size() + 1} more
                    date(s)
                  </>
                )}
              </div>
            ) : (
              <div className="drop-ins-discount alert alert-success">
                {order.dropInsDiscountAppliesToWholeOrder ? (
                  <>
                    🎉 You got <strong>{data.product.dropInsDiscountPercentage}%</strong> off
                    because you selected {data.product.dropInsDiscountDaysThreshold + 1} or more
                    dates
                  </>
                ) : (
                  <>
                    🎉 You got a discount because you selected{' '}
                    {data.product.dropInsDiscountDaysThreshold + 1} or more dates
                  </>
                )}
              </div>
            )}
            {!data.product.sellsSessions ? (
              <Row>
                <Col xs={{ offset: '9' }} />
                <Col xs="3">
                  <Paginator
                    cached={true}
                    className="float-right"
                    onChange={actions.setActiveTimeSlotsCollection}
                    timeSlotsCollection={data.activeTimeSlotsCollection}
                    preloadPages={9}
                  />
                </Col>
              </Row>
            ) : null}
            {data.activeTimeSlotsCollection.empty() ? this.renderLoadingScreen() : null}
          </section>
        )
    }
  }
}

// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(
  stateToProps,
  dispatchToProps
)(TimeSlotsContainer)
