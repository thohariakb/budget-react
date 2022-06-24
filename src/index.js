import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
// use redux 1: combine redux w/ react components
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// use redux 1: 
const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
