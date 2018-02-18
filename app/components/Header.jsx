import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ReactHtmlParser from 'react-html-parser';
import { Jumbotron, Row, Col } from 'reactstrap';

import occsn from '../libs/Occasion';

export default class Header extends PureComponent {
  static propTypes = {
    product: PropTypes.instanceOf(occsn.Product),
  };

  render() {
    let { product } = this.props;

    let merchant = product.merchant();
    let venue = product.venue();

    return <section>
      { product.image.url ? (
        <img style={ { maxHeight: '320px', width: '100%', overflow: 'hidden' } } src={ product.image.url } />
      ) : (null)}
      <Jumbotron>
        <Row>
          <Col className="venue" xs="3">
            <h3>{ venue.name }</h3>
            <p>{ venue.address }, { venue.city }, { venue.state().code } { venue.zip }</p>
          </Col>
          <Col xs="9">
            <h2>{ merchant.name }</h2>
            <hr/>
            <section className="product">
              <h1>{ product.title }</h1>
              <p>{ ReactHtmlParser(product.description) }</p>
            </section>
          </Col>
        </Row>
      </Jumbotron>
    </section>;
  }
}
