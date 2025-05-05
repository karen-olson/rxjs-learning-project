import {Observable, Subject, skipUntil} from 'rxjs';
import {addItem} from "../../helpers";

const producer1 = (observer: any) => {
    var i = 1
    setInterval(() => {
        observer.next(i++)
    }, 1000)
}

// Both observables are created at the same time.
//      Observable 1 starts emitting values right away, every 1 second
//      Observable 2 doesn't emit any values for 3s.
const observable1 = new Observable(producer1);
const observable2 = new Subject();

setTimeout(() => {
    observable2.next('Hey!')
}, 3000)

const observer1 = {
    next: (data: any) => addItem('Observer 1: ' + data),
    error: (err: any) => addItem('Observer 1: ' + err),
    complete: () => addItem('Observer 1: Complete')
}

// Observable 3 is a transformation of Observable 1.
//      It emits the same values as Observable 1, but doesn't start emitting until Observable 2 emits something.
const observable3 =
    observable1
        .pipe(skipUntil(observable2))
        .subscribe(observer1);