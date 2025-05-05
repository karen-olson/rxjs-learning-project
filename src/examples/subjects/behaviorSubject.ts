import {BehaviorSubject} from 'rxjs';
import {addItem} from "../../helpers";

// BEHAVIOR SUBJECT
//   -> Can read and emit values, so it is both an Observable and Observer.
//   -> Subscribers get the last value emitted before their subscription started.
const subject = new BehaviorSubject('Initial value');

// OBSERVER 1
const observer1 = {
    next: (data: any) => addItem('Observer 1: ' + data),
    error: (err: any) => addItem('Observer 1: ' + err),
    complete: () => addItem('Observer 1: Complete')
}
const subscription1 = subject.subscribe(observer1);

// PRODUCING EVENTS - ONLY GOES TO OBSERVER 1
subject.next('The first thing has been sent');
subject.next('Observers 1 & 2 will receive this value');

// OBSERVER 2
const observer2 = {
    next: (data: any) => addItem('Observer 2: ' + data),
    error: (err: any) => addItem('Observer 2: ' + err),
    complete: () => addItem('Observer 2: Complete')
}
const subscription2 = subject.subscribe(observer2);

// PRODUCING EVENTS - GO TO OBSERVERS 1 & 2
subject.next('The second thing has been sent');
subject.next('The third thing has been sent');

// UNSUBSCRIBING OBSERVER 2
subscription2.unsubscribe();

// SENDING ANOTHER EVENT
subject.next('The fourth thing has been sent');