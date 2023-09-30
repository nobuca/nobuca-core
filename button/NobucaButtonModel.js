import NobucaComponentModel from "../component/NobucaComponentModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaButtonModel extends NobucaComponentModel {
    
    constructor(text, enabled) {
        super();
        this.text = text;
        if(this.text == null) {
            this.text = "Button";     
        }
        this.enabled = enabled;
        if(this.enabled == null) {
            this.enabled = true;     
        }
        this.children = [];
        this.clickedEventEmitter = new NobucaEventEmitter();
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

    getClickedEventEmitter() {
        return this.clickedEventEmitter;
    }

    getEnabledChangedEventEmitter() {
        return this.enabledChangedEventEmitter;
    }

    getRequestFocusEventEmitter() {
        return this.requestFocusEventEmitter;
    }
}