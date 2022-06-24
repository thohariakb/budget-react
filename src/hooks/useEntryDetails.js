import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addEntryRedux, updateEntryRedux } from '../actions/entries.actions';
import { closedEditModal } from '../actions/modals.actions';

// custom hook
function useEntryDetails(desc = '', val = '', isExp = true) {
	// form
	const [description, setDescription] = useState(desc);
	const [value, setValue] = useState(val);
	const [isExpense, setIsExpense] = useState(isExp);

	const dispatch = useDispatch();

	useEffect(() => {
		setDescription(desc);
		setValue(val);
		setIsExpense(isExp);
	}, [desc, val, isExp]);

	function updateEntry(id) {
		dispatch(updateEntryRedux(id, { id: id, description, value, isExpense }));
		dispatch(closedEditModal());
		resetValues();
	}

	function addEntry() {
		// use redux 2: use hooks useDispatch()
		dispatch(
			addEntryRedux({
				id: uuidv4(),
				description,
				value,
				isExpense,
			})
		);
		resetValues();
	}

	function resetValues() {
		setDescription('');
		setValue('');
		setIsExpense(true);
	}
	return {
		description,
		setDescription,
		value,
		setValue,
		isExpense,
		setIsExpense,
		addEntry,
		updateEntry,
	};
}

export default useEntryDetails;
