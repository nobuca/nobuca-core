export default class NobucaEventEmitter {

    constructor() {
        this.subscriptions = [];
    }

    emit(value) {
        this.subscriptions.forEach(subscription => subscription(value));
    }

    subscribe(subscription) {
        let index = this.subscriptions.indexOf(subscription);
        if (index >= 0) return;
        this.subscriptions.push(subscription);
        return subscription;
    }

    unsuscribe(subscriptionToBeRemoved) {
        console.log("subscriptions before unsuscribe" + this.subscriptions.length);
        this.subscriptions = this.subscriptions.filter(subscriber => subscriber != subscriptionToBeRemoved)
        console.log("subscriptions after unsuscribe" + this.subscriptions.length);
    }

    clearSubscriptions() {
        this.subscriptions = [];
    }
}