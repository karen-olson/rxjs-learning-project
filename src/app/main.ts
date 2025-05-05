import {Observable} from 'rxjs';
import {addItem} from "../helpers";
import {Greeting, NotSent} from "../Messages";
import {GreetingObserver} from "../GreetingObserver"

// Observable
const subscribeToGreeting = (observer: GreetingObserver) => {
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
const greetingObservable = new Observable(subscribeToGreeting);

// Observers & Subscriptions
const greetingObserver1: GreetingObserver = {
    next: (greeting: Greeting) => addItem(greeting),
    error: (err: any) => addItem(err),
    complete: () => addItem("Complete")
}
const greetingSubscription1 = greetingObservable.subscribe(greetingObserver1);

setTimeout(() => {
    greetingSubscription1.unsubscribe();
}, 3001)


const greetingObserver2: GreetingObserver = {
    next: (greeting: Greeting) => addItem(greeting),
    error: (err: any) => addItem(err),
    complete: () => addItem("Complete")
}
const greetingSubscription2 = greetingObservable.subscribe(greetingObserver2);

setTimeout(() => {
    greetingSubscription2.unsubscribe();
}, 5001)

