import {AsyncSubject} from 'rxjs';
import {addItem} from "../../helpers";

// REPLAY SUBJECT WITH WINDOW TIME
//   -> Can read and emit values, so it is both an Observable and Observer.
//   -> Observers only receive the last emitted event plus any completion event.
const subject = new AsyncSubject();

// OBSERVER 1
const observer1 = {
    next: (data: any) => addItem('Observer 1: ' + data),
    error: (err: any) => addItem('Observer 1: ' + err),
    complete: () => addItem('Observer 1: Complete')
}
const subscription1 = subject.subscribe(observer1);

// PRODUCING EVENTS
//      Observers 1 & 2 only receive the last event.
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
    subject.complete();
}, 500)