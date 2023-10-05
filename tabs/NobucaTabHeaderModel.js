import NobucaComponentModel from "../component/NobucaComponentModel.js";
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaTabHeaderModel extends NobucaComponentModel {

    constructor(id, text) {
        super();
        this.setId(id);
        this.text = text;
        this.closaeable = false;
        this.clickedEventEmitter = this.createEventEmitter();
        this.doubleClickedEventEmitter = this.createEventEmitter();
        this.closeClickedEventEmitter = this.createEventEmitter();
    }

    getClickedEventEmitter() {
        return this.clickedEventEmitter;
    }

    getDoubleClickedEventEmitter() {
        return this.doubleClickedEventEmitter;
    }

    getCloseClickedEventEmitter() {
        return this.closeClickedEventEmitter;
    }

    setIndex(index) {
        this.index = index;
    }

    getIndex() {
        return this.index;
    }

    getText() {
        return this.text;
    }

    setText(text) {
        this.text = text;
    }

    setImageSrc(imageSrc) {
        this.imageSrc = imageSrc;
    }

    getImageSrc() {
        return this.imageSrc;
    }

    getCloseable() {
        return this.closeable;
    }

    setCloseable(closeable) {
        this.closeable = closeable;
    }

    

}