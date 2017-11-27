import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducer from './reducers';

import App from './App';

injectTapEventPlugin();

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <App warnings={false} />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
if (module.hot) {
    module.hot.accept()
}
