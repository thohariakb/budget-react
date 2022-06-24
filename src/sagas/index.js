// redux-saga 4: create function to automatically stall all sagas
/* import * as testSaga from './testSaga'; */
// use redux-saga 2: using effect take 5
import * as entriesSaga from './entriesSaga';
import * as entriesSagaDeletion from './EntriesSagaDeletion';
import * as entriesSagaAdd from './EntriesSagaAdd';

export function initSagas(sagaMiddleware) {
	// use redux-saga 5: saga effect fork: creates another execution for us.
	/* Object.values(testSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware)); */
	Object.values(entriesSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
	// use redux-saga-advanced 1: deleting an item #2
	Object.values(entriesSagaDeletion).forEach(
		sagaMiddleware.run.bind(sagaMiddleware)
	);
	// use redux-saga-advanced : Add an item #2
	Object.values(entriesSagaAdd).forEach(
		sagaMiddleware.run.bind(sagaMiddleware)
	);
} // run all generator function, equals with
// sagaMiddleware.run(testSaga);
// sagaMiddleware.run(count);

// fetch the history data separately in each value
// use redux-saga 6: splitting backend data into 2 endpoints to use with effect fork: "entries" and "values" array obj
