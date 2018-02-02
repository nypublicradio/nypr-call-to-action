import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import pym from 'pym.js';

jest.mock('pym.js');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders query params', () => {
  const props = {
    headline: 'foo',
    summary: 'bar',
    callToAction: 'baz',
    url: 'http://buz.com'
  };
  const app = shallow(<App {...props} />);

  expect(app.find('.App__headline').text()).toEqual(props.headline);
  expect(app.find('.App__summary').text()).toEqual(props.summary);
  expect(app.find('.App__call-out').text()).toEqual(props.callToAction);
  expect(app.find('.App__call-out').prop('href')).toEqual(props.url);
});

it('shows a preview message', () => {
  const app = shallow(<App />);
  expect(app.find('.App__placeholder').text()).toEqual('Fill out the fields and your preview will appear here');
});

describe('pym init', () => {
  pym.Parent.mockImplementation(() => {
    return {
      onMessage: jest.fn(),
      sendMessage: jest.fn(),
      remove: jest.fn()
    }
  });

  it('sets up a listener for the `incoming` message', () => {
    let embed = new pym.Parent();
    mount(<App embed={embed} />);
    expect(embed.onMessage).toHaveBeenCalled();
  });

  it('it sends the `mounted` message when the component mounts', () => {
    let embed = new pym.Parent();
    mount(<App embed={embed} />);
    expect(embed.sendMessage).toHaveBeenCalled();
  });
});
