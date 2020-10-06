import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { StoreProvider } from 'easy-peasy';
import store from './store/configureStore';

ReactDOM.render(
	<StoreProvider store={store}>
		<App />
	</StoreProvider>,
	document.getElementById('root')
);

