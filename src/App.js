import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import MainHeader from './components/MainHeader';
import ModalEdit from './components/ModalEdit';
import NewEntryForm from './components/NewEntryForm';
// use redux 1: use hooks from react-redux to use redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllEntries } from './actions/entries.actions';

function App() {
	// balance
	const [incomeTotal, setIncomeTotal] = useState(0);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [total, setTotal] = useState(0);
	const [entry, setEntry] = useState();
	// use redux 1: entries is reducer name from combinereducers func
	const entries = useSelector((state) => state.entries);
	const { isOpen, id } = useSelector((state) => state.modals);

	useEffect(() => {
		const index = entries.findIndex((entry) => entry.id === id);
		setEntry(entries[index]);
	}, [isOpen, id, entries]);

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

	const dispatch = useDispatch();

	// use redux-saga 1: fetch data from Backend
	useEffect(() => {
		// use redux-saga 2: using effect take 4
		dispatch(getAllEntries());
	}, [dispatch]);

	return (
		<Container>
			<MainHeader title="Budget" />
			<DisplayBalance title="Your Balance:" value={total} size="small" />

			<DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

			<MainHeader type="h3" title="History" />

			<EntryLines
				// use redux 1: use entries data from redux
				entries={entries}
			/>

			<MainHeader type="h3" title="Add new transaction" />
			<NewEntryForm />
			<ModalEdit isOpen={isOpen} {...entry} />
		</Container>
	);
}

export default App;
