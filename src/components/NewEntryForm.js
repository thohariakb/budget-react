import { Form } from 'semantic-ui-react';
import useEntryDetails from '../hooks/useEntryDetails';
import ButtonSaveOrCancel from './ButtonSaveOrCancel';
import EntryForm from './EntryForm';

function NewEntryForm() {
	const {
		description,
		setDescription,
		value,
		setValue,
		isExpense,
		setIsExpense,
		addEntry,
	} = useEntryDetails();

	return (
		<Form unstackable>
			<EntryForm
				description={description}
				value={value}
				isExpense={isExpense}
				setValue={setValue}
				setDescription={setDescription}
				setIsExpense={setIsExpense}
			/>

			<ButtonSaveOrCancel addEntry={addEntry} />
		</Form>
	);
}

export default NewEntryForm;
