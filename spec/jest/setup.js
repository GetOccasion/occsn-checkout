import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import _ from 'underscore';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

global.typesForActions = (actions) => { return _.map(actions, (a) => { return a.type }) };

global.OCCSN = {
  api_key: '',
  host_url: 'http://noisacco.lvh.me:3000',
  product_id: 'QCF67DA'
};
