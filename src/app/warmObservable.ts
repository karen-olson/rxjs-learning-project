import {Observable, share} from 'rxjs';
import {addItem} from "../helpers";
import {Greeting} from "../Messages";
import {GreetingObserver} from "../GreetingObserver"

// PRODUCER & "WARM" OBSERVABLE
//   Producer
const produceGreetings = (observer: GreetingObserver) => {
    try {
        observer.next(Greeting.hello)
        observer.next(Greeting.howAreYou)
        setInterval(() => {
            observer.next(Greeting.notSoBad)
        }, 1000)
    } catch (err) {
        observer.error(err)
    }
}
//    "Warm" Observable
const greetingObservable = new Observable(produceGreetings)
    .pipe(share());

// OBSERVERS & SUBSCRIPTIONS
//   Helpers
const secondsPastCurrentMinute = () => new Date().getSeconds();
const createGreetingObserver = (subscriberName: string): GreetingObserver => {
    return {
        next: (greeting: Greeting) => addItem(`${subscriberName}: (${secondsPastCurrentMinute()}s) ` + greeting),
        error: (err: any) => addItem(`${subscriberName}: (${secondsPastCurrentMinute()}s) ` + err),
        complete: () => addItem(`${subscriberName}: (${secondsPastCurrentMinute()}s) Complete`)
    }
}

//    Observers
const greetingObserver1: GreetingObserver = createGreetingObserver('SUBSCRIBER 1');
const greetingObserver2: GreetingObserver = createGreetingObserver('SUBSCRIBER 2');

//    Subscriptions
const greetingSubscription1 = greetingObservable.subscribe(greetingObserver1);

//    Create A Second Subscription after 1 second
setTimeout(() => {
    const greetingSubscription2 = greetingObservable.subscribe(greetingObserver2);
}, 1000);