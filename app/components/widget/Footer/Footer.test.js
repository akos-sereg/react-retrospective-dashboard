import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

it('Footer mentiones flaticon', () => {
  const component = shallow(<Footer />);

  // make sure that all links are there
  expect(component.find({ href: 'https://www.flaticon.com/authors/kiranshastry' })).toHaveLength(1);
  expect(component.find({ href: 'https://www.flaticon.com/' })).toHaveLength(1);
  expect(component.find({ href: 'http://creativecommons.org/licenses/by/3.0/' })).toHaveLength(1);

  // make sure that all links have the correct texts
  expect(component.find('a[href="https://www.flaticon.com/authors/kiranshastry"]').text()).toEqual('Kiranshastry');
  expect(component.find('a[href="https://www.flaticon.com/"]').text()).toEqual('www.flaticon.com');
  expect(component.find('a[href="http://creativecommons.org/licenses/by/3.0/"]').text()).toContain('CC 3.0 BY');
});
