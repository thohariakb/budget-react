const types = {
	// use redux-saga 2: using effect take 2
	// use redux-saga 4: 2
	POPULATE_ENTRIES: 'POPULATE_ENTRIES',
	// use redux-saga 8: getting all the entry detail data at the same time
	POPULATE_ENTRY_DETAILS: 'POPULATE_ENTRY_DETAILS',
	GET_ENTRIES: 'GET_ENTRIES',
	ADD_ENTRY: 'ADD_ENTRY',
	REMOVE_ENTRY: 'REMOVE_ENTRY',
	UPDATE_ENTRY: 'UPDATE_ENTRY',
	// use redux-saga-advanced 1: deleting an item #6
	REMOVE_ENTRY_RESULT: 'REMOVE_ENTRY_RESULT',
	// use redux-saga-advanced 2: Add an item, add entries saga to our saga initializer #2
	ADD_ENTRY_RESULT: 'ADD_ENTRY_RESULT',
};
export default types;

// redux 6: create action function
export const addEntryRedux = (payload) => {
	// redux 2: dispatching actions & add action
	return { type: types.ADD_ENTRY, payload: payload };
};
export const removeEntryRedux = (id) => {
	return { type: types.REMOVE_ENTRY, payload: { id } };
};

export const updateEntryRedux = (id, entry) => {
	return { type: types.UPDATE_ENTRY, payload: { id, entry } };
};

// use redux-saga 2: using effect take 3
export const getAllEntries = () => {
	return { type: types.GET_ENTRIES };
};

// use redux-saga 4: 3
export const populateEntries = (entries) => {
	return { type: types.POPULATE_ENTRIES, payload: entries };
};

// use redux-saga 8: getting all the entry detail data at the same time 1
export const populateEntryDetail = (id, entry) => {
	return { type: types.POPULATE_ENTRY_DETAILS, payload: { id, entry } };
};
