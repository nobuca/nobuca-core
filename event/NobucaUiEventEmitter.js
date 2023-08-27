export default class NobucaUiEventEmitter {

    constructor() {
        this.subscribers = [];
    }

    emit(value) {
        this.subscribers.forEach(subscriber => subscriber(value));
    }

    subscribe(subscriber) {
        let index = this.subscribers.indexOf(subscriber);
        if (index >= 0) return;
        this.subscribers.push(subscriber);
    }
}