import {Observable} from 'rxjs';
import {addItem} from "../helpers";
import {Greeting} from "../Messages";
import {GreetingObserver} from "../GreetingObserver"

// PRODUCER & OBSERVABLE
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
//    Observable
const greetingObservable = new Observable(produceGreetings);

// OBSERVERS & SUBSCRIPTIONS
const secondsPastCurrentMinute = () => new Date().getSeconds();

const createGreetingObserver = (subscriberName: string): GreetingObserver => {
    return {
        next: (greeting: Greeting) => addItem(`${subscriberName}: (${secondsPastCurrentMinute()})` + greeting),
        error: (err: any) => addItem(`${subscriberName}: (${secondsPastCurrentMinute()})` + err),
        complete: () => addItem(`${subscriberName}: (${secondsPastCurrentMinute()}) Complete`)
    }
}

//    Observers
const greetingObserver1: GreetingObserver = createGreetingObserver('Subscriber 1');
const greetingObserver2: GreetingObserver = createGreetingObserver('Subscriber 2');

//    Subscriptions
const greetingSubscription1 = greetingObservable.subscribe(greetingObserver1);
const greetingSubscription2 = greetingObservable.subscribe(greetingObserver2);

//    Unsubscribing After Timeout
setTimeout(() => {
    greetingSubscription1.unsubscribe();
}, 3001);

setTimeout(() => {
    greetingSubscription2.unsubscribe();
}, 5001);