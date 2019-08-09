import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const updateState = (event) => {
    const type = event.target.name.toUpperCase();
    store.dispatch({
      type,
    });
  };

  return (
    <div>
      <button name="good" onClick={updateState}>good</button>
      <button name="ok" onClick={updateState}>neutral</button>
      <button name="bad" onClick={updateState}>bad</button>
      <button name="reset" onClick={updateState}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
