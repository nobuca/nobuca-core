import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";

export default class NobucaPosition {
    constructor() {
        this.changeEventEmitter = new NobucaUiEventEmitter();
        this.top = null;
        this.left = null;
    }

    getChangeEventEmitter() {
        return this.changeEventEmitter;
    }

    setTop(top) {
        this.top = top;
        this.getChangeEventEmitter().emit();
    }

    getTop() {
        return this.top;
    }

    setLeft(left) {
        this.left = left;
        this.getChangeEventEmitter().emit();
    }

    getLeft() {
        return this.left;
    }

    setTopAndLeft(top, left) {
        this.top = top;
        this.left = left;
        this.getChangeEventEmitter().emit();
    }

}