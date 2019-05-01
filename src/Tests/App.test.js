import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

jest.mock('../PhaserGame/Game', () => () => <div />); //Canvas not properly working with this test. 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('starting app test', () => {
  const value = new App();
  expect(value.state.showGame).toBe(false);
  expect(value.state.showsingle).toBe(false);
  expect(value.state.showmulti).toBe(false);
  expect(value.state.hideButton).toBe(true);
  expect(value.state.showbuttons).toBe(false);
  expect(value.state.infobutton).toBe(true);
})