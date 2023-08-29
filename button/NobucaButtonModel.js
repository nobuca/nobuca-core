import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaButtonModel {
    constructor(text, enabled) {
        this.text = text;
        if(this.text == null) {
            this.text = "Button";     
        }
        this.enabled = enabled;
        if(this.enabled == null) {
            this.enabled = true;     
        }
        this.clickEventEmitter = new NobucaEventEmitter();
        this.enabledChangedEventEmitter = new NobucaEventEmitter();
        this.requestFocusEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaButtonModel";
    }

    getText() {
        return this.text;
    }

    setText(text) {
        this.text = text;
    }

    enable() {
        if (this.enabled) return;
        this.enabled = true;
        this.getEnabledChangedEventEmitter().emit(this.enabled);
    }

    focus() {
        this.getRequestFocusEventEmitter().emit();
    }

    disable() {
        if (!this.enabled) return;
        this.enabled = false;
        this.getEnabledChangedEventEmitter().emit(this.enabled);
    }

    getEnabled() {
        return this.enabled;
    }

    getClickEventEmitter() {
        return this.clickEventEmitter;
    }

    getEnabledChangedEventEmitter() {
        return this.enabledChangedEventEmitter;
    }

    getRequestFocusEventEmitter() {
        return this.requestFocusEventEmitter;
    }
}