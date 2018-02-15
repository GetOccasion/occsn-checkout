import React, { PureComponent } from 'react';

import occsn from '../libs/Occasion.js';

import '../styles/index.css'

export default class Root extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    occsn.Product.find(window.OCCSN.product_id)
    .then((product) => {
      this.setState({ product });
    });
  }

  render() {
    const { product } =  this.state;

    if(!product) return <p>Hello World!!</p>;

    return (
      <p>Hello { product.title }!!</p>
    );
  }
}
