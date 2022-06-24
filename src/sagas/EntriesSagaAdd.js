// action => saga => reducer
import axios from 'axios';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import entriesTypes from '../actions/entries.actions';

// use redux-saga-advanced 2: Add an item, add entries saga to our saga initializer #1
// when we take latest action
export function* addEntrySaga() {
	yield takeLatest(entriesTypes.ADD_ENTRY, addEntryToDb);
}

// use redux-saga-advanced 2: Add an item, #4
function* addEntryToDb({ payload }) {
	console.log('add entry', payload);
	// use redux-saga-advanced 2: Add an item, send to BE #5
	yield call(addEntry, payload);
	yield call(addEntryDetails, payload);
	// use redux-saga-advanced 3: Update an item
	yield put({ type: entriesTypes.ADD_ENTRY_RESULT, payload: payload });
}

// use redux-saga-advanced 2: Add an item, send to BE #6
async function addEntry({ id, description }) {
	/* console.log('entry', id, description); */
	await axios.post(`http://127.0.0.1:3002/entries`, {
		id,
		description,
	});
}

// use redux-saga-advanced 2: Add an item, send to BE #7
async function addEntryDetails({ id, isExpense, value }) {
	/* console.log('details', id, isExpense, value); */
	await axios.post(`http://127.0.0.1:3002/values`, {
		id,
		isExpense,
		value,
	});
}
