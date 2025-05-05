import {ReplaySubject} from 'rxjs';
import {addItem} from "../helpers";

// REPLAY SUBJECT WITH WINDOW TIME
//   -> Can read and emit values, so it is both an Observable and Observer.
//   -> Subscribers get pre-subscription events emitted within the specified time window.
const subject = new ReplaySubject(1000, 500);

// OBSERVER 1
const observer1 = {
    next: (data: any) => addItem('Observer 1: ' + data),
    error: (err: any) => addItem('Observer 1: ' + err),
    complete: () => addItem('Observer 1: Complete')
}
const subscription1 = subject.subscribe(observer1);

// PRODUCING EVENTS
//      Observer 1 receives all events because it was created before event emissions
//      Observer 2 receives up to 2 events prior to its creation (at 500ms) if they happened within 2s before subscription.
var i = 1;
var interval = setInterval(() => {
    subject.next(`Thing ${i++}`);
}, 100);

// OBSERVER 2
const observer2 = {
    next: (data: any) => addItem('Observer 2: ' + data),
    error: (err: any) => addItem('Observer 2: ' + err),
    complete: () => addItem('Observer 2: Complete')
}

setTimeout(() => {
    const subscription2 = subject.subscribe(observer2);
}, 500)