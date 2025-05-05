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

// Observer & Subscription
const greetingObserver: GreetingObserver = {
    next: (greeting: Greeting) => addItem(greeting),
    error: (err: any) => addItem(err),
    complete: () => addItem("Complete")
}

const greetingSubscription = greetingObservable.subscribe(greetingObserver);

setTimeout(() => {
    greetingSubscription.unsubscribe();
}, 3001)

