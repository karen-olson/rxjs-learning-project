import {merge, Observable} from 'rxjs';
import {addItem} from "../../helpers";

// OBSERVABLES
const observable1 = new Observable((observer) => observer.next(1))
const observable2 = new Observable((observer) => observer.next(2))
const observable3 = merge(observable1, observable2);

// OBSERVERS
const numberObserver1 = (number: number) => {addItem(`Observer 1: ${number}`)};
const numberObserver2 = (number: number) => {addItem(`Observer 2: ${number}`)};
const numberObserver3 = (number: number) => {addItem(`Observer 3: ${number}`)};

// SUBSCRIPTIONS
observable1.subscribe(numberObserver1); // Receives 1
observable2.subscribe(numberObserver2); // Receives 2
observable3.subscribe(numberObserver3); // Receives 1 & 2

