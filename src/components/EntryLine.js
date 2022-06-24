import { Fragment } from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
// use redux 2: use hooks useDispatch()
import { useDispatch } from 'react-redux';
import { removeEntryRedux } from '../actions/entries.actions';
import { openEditModal } from '../actions/modals.actions';

function EntryLine({ id, description, value, isExpense = false }) {
	// use redux 2: use hooks useDispatch()
	const dispatch = useDispatch();
	return (
		<Fragment>
			<Segment color={isExpense ? 'red' : 'green'}>
				<Grid columns={3} textAlign="right">
					<Grid.Row>
						<Grid.Column width={10} textAlign="left">
							{description}
						</Grid.Column>
						<Grid.Column width={3} textAlign="right">
							{value}
						</Grid.Column>
						<Grid.Column width={3}>
							<Icon
								name="edit"
								bordered
								onClick={() => dispatch(openEditModal(id))}
							/>
							<Icon
								name="trash"
								bordered
								// use redux 2: use hooks useDispatch()
								onClick={() => dispatch(removeEntryRedux(id))}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Fragment>
	);
}

export default EntryLine;
