import React from 'react';
import Avatar from '../src/components/Avatar/index.js';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Avatar initial={'AL'} color={'#fff'} />).toJSON();
  expect(rendered).toBeTruthy();
});
