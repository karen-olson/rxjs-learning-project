import {map, Observable} from 'rxjs';
import {addItem} from "../helpers";

// PRODUCER
const producer = (observer: any) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
}

// OBSERVER
const numberObserver = {
    next: (number: number) => addItem(number),
    error: (err: any) => addItem(err),
    complete: () => addItem('Complete')
}

// OBSERVABLE, MAPPING, AND OBSERVER SUBSCRIPTION
new Observable(producer)
    .pipe(map((number: number) =>
            number * 10
        ))
    .subscribe(numberObserver); // numberObserver receives 10, 20, 30