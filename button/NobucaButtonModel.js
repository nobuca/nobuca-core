import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";

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
        this.clickEventEmitter = new NobucaUiEventEmitter();
        this.enabledChangedEventEmitter = new NobucaUiEventEmitter();
        this.requestFocusEventEmitter = new NobucaUiEventEmitter();
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