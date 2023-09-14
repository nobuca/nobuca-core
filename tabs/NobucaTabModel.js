import NobucaComponentModel from "../component/NobucaComponentModel.js";
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaTabModel extends NobucaComponentModel {

    constructor(id, text) {
        super();
        this.setId(id);
        this.text = text;
        this.closaeable = false;
        this.textChangeEventEmitter = new NobucaEventEmitter();
        this.closeableChangeEventEmitter = new NobucaEventEmitter();
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

    getTextChangeEventEmitter() {
        return this.textChangeEventEmitter;
    }

    getCloseableChangeEventEmitter() {
        return this.closeableChangeEventEmitter;
    }

}