import {Greeting, NotSent} from "./Messages";

interface GreetingObserver {
    next:(greeting: Greeting | NotSent) => void;
    error: (err: any) => void;
    complete: () => void;
}

export {GreetingObserver};