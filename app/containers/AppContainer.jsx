import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { Resource } from 'mitragyna';

import { loadProduct, setOrder } from '../actions/appActions';
import { loadProductTimeSlots } from '../actions/calendarActions';

import '../styles/index.css'

import Header from '../components/Header';
import Order from '../components/Order';

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
      loadProduct: () => dispatch(loadProduct(window.OCCSN.product_id)),
      loadProductTimeSlots: (product) => dispatch(loadProductTimeSlots(product)),
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
  }

  render() {
    const { actions, data } = this.props;

    return <Container>
      { data.product ? (
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
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
                    subject={ data.order }
                  ></Resource>
                </Col>
              </Row>
            ) : (null)}
          </Col>
        </Row>
      ) : (
        this.renderLoadingScreen()
      )}
    </Container>;
  }

  renderLoadingScreen() {
    return <Row>
      <Col>
        <p>Loading...</p>
      </Col>
    </Row>;
  }
}

// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(stateToProps, dispatchToProps)(AppContainer);
