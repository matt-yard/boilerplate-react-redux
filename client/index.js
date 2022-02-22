import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import store from './store/index.js'
import {Provider} from 'react-redux'
import './index.css'
import {BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
