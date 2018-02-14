import React from 'react';
import Root from '../app/containers/Root.jsx';

describe('MyComponent', () => {
  it('should render my component', () => {
    const wrapper = shallow(<Root />);

    expect(wrapper).toMatchSnapshot();
  });
});
