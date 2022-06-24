import { useDispatch } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { closedEditModal } from '../actions/modals.actions';
import useEntryDetails from '../hooks/useEntryDetails';
import EntryForm from './EntryForm';

function ModalEdit({ isOpen, description, value, isExpense, id }) {
	const dispatch = useDispatch();

	const entryUpdate = useEntryDetails(description, value, isExpense);
	return (
		<Modal open={isOpen}>
			<Modal.Header>Edit entry</Modal.Header>
			<Modal.Content>
				<EntryForm
					description={entryUpdate.description}
					value={entryUpdate.value}
					isExpense={entryUpdate.isExpense}
					setValue={entryUpdate.setValue}
					setDescription={entryUpdate.setDescription}
					setIsExpense={entryUpdate.setIsExpense}
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={() => dispatch(closedEditModal())}>Close</Button>
				<Button onClick={() => entryUpdate.updateEntry(id)} primary>
					OK
				</Button>
			</Modal.Actions>
		</Modal>
	);
}

export default ModalEdit;
