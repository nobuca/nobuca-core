import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaSize {
    constructor() {
        this.changeEventEmitter = new NobucaEventEmitter();
        this.width = null;
        this.height = null;
        this.fixedWidth = null;
    }

    getChangeEventEmitter() {
        return this.changeEventEmitter;
    }

    setWidth(width) {
        this.width = width;
        this.getChangeEventEmitter().emit();
    }

    getWidth() {
        return this.width;
    }

    setHeight(height) {
        this.height = height;
        this.getChangeEventEmitter().emit();
    }

    setWidthAndHeight(width, height) {
        this.width = width;
        this.height = height;
        this.getChangeEventEmitter().emit();
    }

    getHeight() {
        return this.height;
    }

    fixWidth() {
        this.fixedWidth = this.getWidth();
    }

    getFixedWidth() {
        return this.fixedWidth;
    }

    setFixedWidth(fixedWidth) {
        this.fixedWidth = fixedWidth;
        this.getChangeEventEmitter().emit();
    }

    hasFixedWidth() {
        return getFixedWidth() != null;
    }

    getFixedHeight() {
        return this.fixedHeight;
    }

    setFixedHeight(fixedHeight) {
        this.fixedHeight = fixedHeight;
        this.getChangeEventEmitter().emit();
    }
}