import React, { Component } from 'react';

import occsn from '../libs/Occasion.js';

import '../styles/index.css'

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({ product: occsn.Product.build({ title: 'Nick' }) });
  }

  render() {
    const { product } =  this.state;

    if(!product) return;

    return (
      <p>Hello { product.title }!!</p>
    );
  }
}
