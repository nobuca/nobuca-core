import NobucaComponentModel from "../component/NobucaComponentModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaTextModel extends NobucaComponentModel {

    constructor(value) {
        super();
        this.enabled = true;
        this.value = value;
        this.password = false;
        this.focused = false;
        this.focusEventEmitter = new NobucaEventEmitter();
        this.valueChangedEventEmitter = new NobucaEventEmitter();
        this.enabledChangedEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaTextModel";
    }

    getEnabled() {
        return this.enabled;
    }

    disable() {
        if (!this.enabled) return;
        this.enabled = false;
        this.getEnabledChangedEventEmitter().emit(this.enabled);
    }

    enable() {
        if (this.enabled) return;
        this.enabled = true;
        this.getEnabledChangedEventEmitter().emit(this.enabled);
    }

    setValue(value) {
        let valueChanged = this.value !== value;
        this.value = value;
        if (valueChanged) {
            this.getValueChangedEventEmitter().emit(this.value);
        }
    }

    getValue() {
        return this.value;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getFocus() {
        return this.focused;
    }

    focus() {
        if (this.focused) return;
        this.focused = true;
        this.getFocusEventEmitter().emit(this.focused);
    }

    blur() {
        if (!this.focused) return;
        this.focused = false;
        this.getFocusEventEmitter().emit(this.focused);
    }

    setMinLength(minLength) {
        this.minLength = minLength;
    }

    getMinLength() {
        return this.minLength;
    }

    setMaxLength(maxLength) {
        this.maxLength = maxLength;
    }

    getMaxLength() {
        return this.maxLength;
    }

    getFocusEventEmitter() {
        return this.focusEventEmitter;
    }

    getValueChangedEventEmitter() {
        return this.valueChangedEventEmitter;
    }

    getEnabledChangedEventEmitter() {
        return this.enabledChangedEventEmitter;
    }
}