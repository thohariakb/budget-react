import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import MainHeader from './components/MainHeader';
import ModalEdit from './components/ModalEdit';
import NewEntryForm from './components/NewEntryForm';

function App() {
	const [entries, setEntries] = useState(initalEntries);
	// form
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');
	const [isExpense, setIsExpense] = useState(true);
	// Modal
	const [isOpen, setIsOpen] = useState(false);
	const [entryId, setEntryId] = useState();
	// balance
	const [incomeTotal, setIncomeTotal] = useState(0);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (!isOpen && entryId) {
			const index = entries.findIndex((entry) => entry.id === entryId);
			const newEntries = [...entries];
			newEntries[index].description = description;
			newEntries[index].value = value;
			newEntries[index].isExpense = isExpense;
			setEntries(newEntries);
			// reset add form
			resetEntry();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	useEffect(() => {
		let totalIncome = 0;
		let totalExpense = 0;
		entries.map((entry) => {
			if (entry.isExpense) {
				return (totalExpense += Number(entry.value));
			} else {
				return (totalIncome += Number(entry.value));
			}
		});
		setTotal(totalIncome - totalExpense);
		setExpenseTotal(totalExpense);
		setIncomeTotal(totalIncome);
	}, [entries]);

	function deleteEntry(id) {
		const result = entries.filter((entry) => entry.id !== id);
		setEntries(result);
	}

	function editEntry(id) {
		console.log(`edit entry with id ${id}`);
		if (id) {
			const index = entries.findIndex((entry) => entry.id === id);
			const entry = entries[index];
			// to edit
			setEntryId(id);
			// to fulfill form
			setDescription(entry.description);
			setValue(entry.value);
			setIsExpense(entry.isExpense);
			setIsOpen(true);
		}
	}

	function addEntry() {
		const result = [
			...entries,
			{ id: Date.now(), description, value, isExpense },
		];
		console.log('result', result);
		console.log('entries', entries);
		setEntries(result);
		resetEntry();
	}

	function resetEntry() {
		setDescription('');
		setValue('');
		setIsExpense(true);
	}

	return (
		<Container>
			<MainHeader title="Budget" />
			<DisplayBalance title="Your Balance:" value={total} size="small" />

			<DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

			<MainHeader type="h3" title="History" />

			<EntryLines
				entries={entries}
				deleteEntry={deleteEntry}
				editEntry={editEntry}
			/>

			<MainHeader type="h3" title="Add new transaction" />
			<NewEntryForm
				addEntry={addEntry}
				description={description}
				value={value}
				isExpense={isExpense}
				setValue={setValue}
				setDescription={setDescription}
				setIsExpense={setIsExpense}
			/>
			<ModalEdit
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				description={description}
				value={value}
				isExpense={isExpense}
				setValue={setValue}
				setDescription={setDescription}
				setIsExpense={setIsExpense}
			/>
		</Container>
	);
}

export default App;

var initalEntries = [
	{
		id: 1,
		description: 'Work income',
		value: 1000.0,
		isExpense: false,
	},
	{
		id: 2,
		description: 'Water bill',
		value: 20.0,
		isExpense: true,
	},
	{
		id: 3,
		description: 'Rent',
		value: 300.0,
		isExpense: true,
	},
	{
		id: 4,
		description: 'Power bill',
		value: 50.0,
		isExpense: true,
	},
];
