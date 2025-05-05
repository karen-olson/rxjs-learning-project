import {ReplaySubject} from 'rxjs';
import {addItem} from "../../helpers";

// REPLAY SUBJECT
//   -> Can read and emit values, so it is both an Observable and Observer.
//   -> Subscribers get the designated number of values emitted before their subscription started.
const subject = new ReplaySubject(2);

// OBSERVER 1
const observer1 = {
    next: (data: any) => addItem('Observer 1: ' + data),
    error: (err: any) => addItem('Observer 1: ' + err),
    complete: () => addItem('Observer 1: Complete')
}
const subscription1 = subject.subscribe(observer1);

// PRODUCING EVENTS
//      Observer 1 receives things 1-4 because it was created before event emissions
//      Observer 2 receives things 3 & 4 because of buffer size 2
subject.next('Thing 1');
subject.next('Thing 2');
subject.next('Thing 3');
subject.next('Thing 4');

// OBSERVER 2
const observer2 = {
    next: (data: any) => addItem('Observer 2: ' + data),
    error: (err: any) => addItem('Observer 2: ' + err),
    complete: () => addItem('Observer 2: Complete')
}
const subscription2 = subject.subscribe(observer2);

// PRODUCING EVENTS
//      Both observers receive thing 5 & 6
subject.next('Thing 5');
subject.next('Thing 6');