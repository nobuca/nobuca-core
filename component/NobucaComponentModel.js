import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaComponentModel {

    constructor() {
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    newEventEmitter() {
        return new NobucaEventEmitter();
    }
}
