import axios from 'axios';
import { call, put, take } from 'redux-saga/effects';
import entriesTypes from '../actions/entries.actions';

// use redux-saga-advanced 1: deleting an item #1
export function* deleteEntrySaga() {
	while (true) {
		// blocking saga: it won't going to be able to click it again or to send another request until he first request is done.
		const { payload } = yield take(entriesTypes.REMOVE_ENTRY);
		yield call(deleteEntrie, payload.id);
		// use redux-saga-advanced 1: deleting an item #5
		yield put({ type: 'REMOVE_ENTRY_RESULT', payload: { id: payload.id } });
	}
}

// use redux-saga-advanced 1: deleting an item #3
async function deleteEntrie(id) {
	await axios.delete(`http://127.0.0.1:3002/entries/${id}`);
	await axios.delete(`http://127.0.0.1:3002/values/${id}`);
	// await new Promise((s) => setTimeout(s, 3000));
}
