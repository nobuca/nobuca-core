import NobucaUiEventEmitter from '../event/NobucaUiEventEmitter.js';

export default class NobucaTabModel {
    constructor() {
        this.text = null;
        this.body = null;
        this.data = null;
        this.closaeable = false;
        this.textChangeEventEmitter = new NobucaUiEventEmitter();
        this.closeableChangeEventEmitter = new NobucaUiEventEmitter();
    }

    getText() {
        return this.text;
    }

    setText(text) {
        this.text = text;
        this.getTextChangeEventEmitter().emit(this.text);
    }

    getCloseable() {
        return this.closeable;
    }

    setCloseable(closeable) {
        this.closeable = closeable;
        this.getCloseableChangeEventEmitter().emit(closeable);
    }

    getBody() {
        return this.body;
    }

    setBody(body) {
        this.body = body;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getTextChangeEventEmitter() {
        return this.textChangeEventEmitter;
    }

    getCloseableChangeEventEmitter() {
        return this.closeableChangeEventEmitter;
    }
}