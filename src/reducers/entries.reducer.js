import entriesTypes from '../actions/entries.actions';

// redux 7: create reducer
// redux 2: add action
const reducer = (state = initalEntries, action) => {
	let newEntries;
	switch (action.type) {
		// use redux-saga 4: create action to populate/get entries data 1
		case entriesTypes.POPULATE_ENTRIES:
			return action.payload;
		// use redux-saga-advanced 2: Add an item, add entries saga to our saga initializer #3
		case entriesTypes.ADD_ENTRY_RESULT:
			// Redux 3: add payload
			newEntries = [...state, action.payload];
			return newEntries;
		// use redux-saga-advanced 1: deleting an item #4
		case entriesTypes.REMOVE_ENTRY_RESULT:
			// redux 5: remove payload
			newEntries = state.filter((entry) => entry.id !== action.payload.id);
			return newEntries;
		// use redux-saga 8: getting all the entry detail data at the same time 3
		case entriesTypes.POPULATE_ENTRY_DETAILS:
		case entriesTypes.UPDATE_ENTRY:
			newEntries = [...state];
			const index = newEntries.findIndex(
				(entry) => entry.id === action.payload.id
			);
			// use redux-saga 8: getting all the entry detail data at the same time 3
			newEntries[index] = { ...newEntries[index], ...action.payload.entry };
			return newEntries;
		default:
			return state;
	}
};

export default reducer;

var initalEntries = [];
