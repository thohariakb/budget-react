// redux-saga 3: saga effect - take
import {
	delay,
	take,
	put,
	call,
	fork,
	takeEvery,
	cancelled,
	cancel,
	takeLatest,
} from 'redux-saga/effects';

function double(number) {
	return number * 2;
}

// redux-saga 2: create saga generator function
// generator function means can return multiple values with yield as return
export function* testSaga() {
	// while true means while true so during the whole life of this application, keep in doing this and getting me these results.
	// while (true) {
	// yield delay(1000); // return adter 1000 seconds
	// 	console.log("I'm a saga function");
	// }

	// redux-saga 3: saga effect - take
	// take "await" till take effect value is same w/ dispatch/put effect type value then continue next code
	while (true) {
		console.log('Staring saga');
		// redux-saga 4: saga effect - put: put is like dispatch to message to saga
		const state = yield take('TEST_MESSAGE'); // equals { type: 'TEST_MESSAGE', payload: 1000 }
		// redux-saga 5: saga effect - call: to call a function.
		const a = yield call(double, 2); // equals 4
		console.log(a);
		const b = yield double(3); // equals 6. call w/ calling func is doesn't make much difference.
		// they is little bit of difference when we're starting debugging and putting the logs
		console.log(b);
		console.log('Finishing saga function', state);
	}
}

// redux-saga-advanced 4: effect Takelatest:
// creates a new fog every time for a message, if it received the same message againt
function* infinitySaga() {
	console.log(`Stating inifinity saga`);
	let index = 0;
	while (true) {
		// try catch finally to use cancelled effect to check stop/or not the fork
		try {
			console.log(`inside infinity loop ${index}`);
			yield delay(1000);
		} catch (error) {
			console.log('A error happend:', error);
		} finally {
			console.log('The fork was canceled? ', yield cancelled());
		}
	}
	// console.log(`Ending inifinity saga`);
}

// redux-saga-advanced 4: effect Takelatest: take + cancel + fork
export function* testSagaTakeLatest() {
	yield takeLatest('TEST_MESSAGE_5', infinitySaga);
}

// redux-saga-advanced 4: effect Takelatest:
export function* dispatchTest() {
	let index = 0;
	// yield put({ type: 'TEST_MESSAGE_4', payload: index });

	while (true) {
		yield delay(5000);
		yield put({ type: 'TEST_MESSAGE_5', payload: index });
		index++;
	}
}

// redux-saga-advanced 3: 3
/* function* infinitySaga() {
	console.log(`Stating inifinity saga`);
	while (true) {
		// try catch finally to use cancelled effect to check stop/or not the fork
		try {
			console.log(`inside infinity loop`);
			yield delay(500);
		} catch (error) {
			console.log('A error happend:', error);
		} finally {
			console.log('The fork was canceled? ', yield cancelled());
		}
	}
	console.log(`Ending inifinity saga`);
} */

// redux-saga-advanced 3: this saga fork another saga that gonna run forever 2
export function* testSagaCancelled() {
	yield take('TEST_MESSAGE_4');
	// redux-saga-advanced 3: 4
	const handleCancel = yield fork(infinitySaga);
	// fork will stop after 3secs
	yield delay(3000);
	yield cancel(handleCancel);
}

// redux-saga-advanced 3: effect cancel and cancelled 1
// cancel: cancel fork. to stop fork ex: use doesn't search bunch of images anymore so to cancelled
// cancelled: tell us if the fork is cancel or not
/* export function* dispatchTest() {
	let index = 0;
	yield put({ type: 'TEST_MESSAGE_4', payload: index });

} */

// redux-saga-advanced 1: takeevery - every take need fork
export function* testSagaTakeEveryProcess({ payload }) {
	console.log(`Starting Process for index ${payload}`);
	yield delay(3000);
	console.log(`Ending Process for index ${payload}`);
}

// redux-saga-advanced 1: effect takeevery 2
export function* testSagaTakeEvery() {
	const { payload } = yield takeEvery(
		'TEST_MESSAGE_3',
		testSagaTakeEveryProcess
	);
	console.log(`Finish TakeEvery for index ${payload}`); // this won't be called/return if there is takeevery
}

// redux-saga-advanced 1: effect takeevery 1
/* export function* dispatchTest() {
	let index = 0;
	while (true) {
		yield delay(500);
		// redux-saga-advanced 1: effect takeevery: take + fork effect
		yield put({ type: 'TEST_MESSAGE_3', payload: index });
		index++;
	}
} */

// use redux-saga 5: 3
function* doNothing() {
	console.log('I have been called');
	yield delay(1000);
	console.log('I am doing nothing');
}

// use redux-saga 5:saga effect fork: creates another execution/function in the same time not wait the till end result (run in paralel).. 1
export function* testSagaFork() {
	while (true) {
		// use redux-saga 5: 4
		yield take('TEST_MESSAGE_2');
		// use redux-saga 5: saga effect fork: creates another execution/function in the same time not wait the till end result (run in paralel). 2
		// but call creates another execution/run function wait the till end result
		yield fork(doNothing);
		yield fork(doNothing);
		yield fork(doNothing);
	}
}

/* export function* dispatchTest() {
	while (true) {
		yield delay(500);
		// redux-saga 4: saga effect - put: put is like dispatch the message to saga and send data to reducer
		// use redux-saga 5: 4
		yield put({ type: 'TEST_MESSAGE_2', payload: 1000 });
	}
} */

// yield is return
// export function* counts() {
// 	yield 1;
// 	yield 2;
// 	yield 3;
// 	yield 4;
// 	yield 5;
// }

// generator functions are functions that we can exit and enter in any point: .next()
// with yield & return as final value
/* export function* count() {
	yield 1;
	yield 2;
	return 3;
}
 */
// var c = count();
// c.next(); // { value: 1, done: false }
// c.next(); // { value: 2, done: false }
// c.next(); // { value: 3, done: true }

// infinity generator function
// it wont be infinite if there is paramter in the function
// and that function is not running and only run with .next() method
/* function* square(x) {
	while (true) {
		x = x * 2;
		yield x;
	}
} */
// var s = square(2);
// s.next(); // { value: 4, done: false }

// driving the point home. re-enter function in every yield
/* function* steps() {
	console.log(1); // do logic code here
	yield 1;
	console.log(2);
	yield 2;
	console.log(3);
	return 3;
} */
/* var step = steps();
step.next(); */
// 1
// { value: 1, done: false }

// redux-saga-advanced 3: effect cancel and cancelled
// cancelled: cancel fork. to stop fork ex: use doesn't search bunch of images anymore so to cancelled
// cancel: tell us if the fork is cancel or not
