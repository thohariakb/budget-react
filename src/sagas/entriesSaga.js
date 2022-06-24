import { call, take, put, fork } from 'redux-saga/effects';
import entriesType, {
	populateEntries,
	populateEntryDetail,
} from '../actions/entries.actions';
import axios from 'axios';

// use redux-saga 2: using effect take 1
// "wait" until we receive a message to fetch all the entries.
export function* getAllEntries() {
	yield take(entriesType.GET_ENTRIES);
	console.log('I need to get the entries now');
	// use redux-saga 3: quering data from our saga using effect call
	const result = yield call(axios, 'http://127.0.0.1:3002/entries');

	// use redux-saga 4: adding/populate the data  using put 4
	yield put(populateEntries(result.data));
}

// use redux-saga 7:
export function* getEntryDetails(id) {
	const { data } = yield call(axios, `http://127.0.0.1:3002/values/${id}`);
	console.log(data);
	// use redux-saga 8: getting all the entry detail data at the same time 2
	yield put(populateEntryDetail(id, data));
}

// use redux-saga 7: implement saga effect fork
export function* getAllEntriesDetails() {
	// wait the populate/all entries first and get populate entries payload
	const { payload } = yield take(entriesType.POPULATE_ENTRIES);
	for (let index = 0; index < payload.length; index++) {
		const entry = payload[index];
		// use redux-saga 7: fork and make many request to backend at same time in each ids we're receiving
		yield fork(getEntryDetails, entry.id);
	}
}

