import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

jest.mock('../PhaserGame/Game', () => () => <div />); //Canvas not properly working with this test. 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
