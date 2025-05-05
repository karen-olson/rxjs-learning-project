import {fromEvent, Observer} from 'rxjs';
import {addItem} from "../../helpers";

// "HOT" OBSERVABLE
//      Receives values as soon as it's instantiated, regardless of whether subscribers are listening.
//      Doesn't emit values to subscribers until the subscription starts.
const mouseMoveObservable = fromEvent(document, 'mousemove');

// OBSERVERS & SUBSCRIPTIONS
//   Helpers
const secondsPastCurrentMinute = () => new Date().getSeconds();
const createObserver = (subscriberName: string): Observer<any> => {
    return {
        next: (event: any) => addItem(`${subscriberName}: (${secondsPastCurrentMinute()}s) ` + event),
        error: (err: any) => addItem(`${subscriberName}: (${secondsPastCurrentMinute()}s) ` + err),
        complete: () => addItem(`${subscriberName}: (${secondsPastCurrentMinute()}s) Complete`)
    }
}

//    Observers
const mouseMoveObserver1: Observer<any> = createObserver('SUBSCRIBER 1');

//    Subscriptions
setTimeout(() => {
    const subscription1 = mouseMoveObservable.subscribe(mouseMoveObserver1);
}, 2000)