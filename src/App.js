import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import Routes from './routes/index'
import reducers from './reducers/index'
import Socket from './Socket';

export const history = createBrowserHistory()

const componentEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, {}, componentEnhancers(applyMiddleware(ReduxThunk)))

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router history={history}>
          <Routes />
          {/* <Socket /> */}
        </Router>
      </Provider>
    </div>
  );
}

const token = localStorage.getItem('Token')

if (token) {
  store.dispatch({
    type: 'TOKEN_LOGIN',
    payload: {
      token
    }
  })
  if (history.location.pathname === '/') {
    history.push('/lobby')
  } else {
    history.push({ pathname: history.location.pathname, search: history.location.search })
  }
} else {
  history.push({ pathname: history.location.pathname })
}

export default App;
