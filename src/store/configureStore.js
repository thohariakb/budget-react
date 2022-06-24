// Yarn add:
// 	▪	redux
// 	▪	react-redux
// 	▪	uuid
// 	▪	redux-devtools-extension
// 	▪	redux-saga
// 	▪	axios

// Yarn add -D:
// 	▪	redux-devtools
// 	▪	concurrently - to run all script together

// sudo npm install -g:
// 	▪	json-server
// json-server --watch db.json

import { applyMiddleware, combineReducers, createStore } from 'redux';
import entriesReducer from '../reducers/entries.reducer';
import modalsReducer from '../reducers/modals.reducer';
// use redux 3: install and config redux dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
// redux-saga 1:
import createSagaMiddleware from 'redux-saga';
import { initSagas } from '../sagas';

const configureStore = () => {
	// redux-saga 1:
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	// redux 1: create redux store
	// redux 8: combine redux reducers
	const store = createStore(
		combineReducers({
			entries: entriesReducer,
			modals: modalsReducer,
		}),
		composeWithDevTools(
			// redux-saga 1: add sagaMiddleware
			applyMiddleware(...middlewares)
		) // use redux 3
	);
	// redux-saga 3: every time we create a saga, we had to run the saga
	initSagas(sagaMiddleware);
	return store;
};

export default configureStore;
