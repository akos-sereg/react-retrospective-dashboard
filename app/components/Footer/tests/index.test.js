import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../index';

describe('<Footer />', () => {
  it('should mention React', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.text()).toContain('React');
  });
});
