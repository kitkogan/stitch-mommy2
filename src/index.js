import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';


const firstReducer = (state={}, action) => {
  if(action.type === 'BUTTON_1') {
    console.log('btton 1 clicked');
  }
  return state;
};

const secondReducer = (state={}, action) => {
  if(action.type === 'BUTTON_2') {
    console.log('btton 2 clicked');
  }
  return state;
};

const storeInstance = createStore(
  combineReducers({
    firstReducer,
    secondReducer
  }),    
);

ReactDOM.render(
  <Provider store={storeInstance}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
