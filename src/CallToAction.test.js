import React from 'react';
import ReactDOM from 'react-dom';
import CallToAction from './CallToAction';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CallToAction />, div);
});

it('renders query params', () => {
  const props = {
    headline: 'foo',
    summary: 'bar',
    callToAction: 'baz',
    url: 'http://buz.com'
  };
  const app = shallow(<CallToAction {...props} />);

  expect(app.find('.CallToAction__headline').text()).toEqual(props.headline);
  expect(app.find('.CallToAction__summary').text()).toEqual(props.summary);
  expect(app.find('.CallToAction__call-out').text()).toEqual(props.callToAction);
  expect(app.find('.CallToAction__call-out').prop('href')).toEqual(props.url);
});

it('shows a preview message', () => {
  const app = shallow(<CallToAction />);
  expect(app.find('.CallToAction__placeholder').text()).toEqual('Fill out the fields and your preview will appear here');
});
