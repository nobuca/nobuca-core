import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaTextAreaModel {

    constructor() {
        this.enabled = true;
        this.value = null;
        this.focusEventEmitter = new NobucaEventEmitter();
        this.valueChangeEventEmitter = new NobucaEventEmitter();
        this.enabledChangedEventEmitter = new NobucaEventEmitter();
        this.selectEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaTextAreaModel";
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
            this.getValueChangeEventEmitter().emit(this.value);
        }
    }

    getValue() {
        return this.value;
    }

    select() {
        this.getSelectEventEmitter().emit();
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

    getFocusEventEmitter() {
        return this.focusEventEmitter;
    }

    getValueChangeEventEmitter() {
        return this.valueChangeEventEmitter;
    }

    getEnabledChangedEventEmitter() {
        return this.enabledChangedEventEmitter;
    }

    getSelectEventEmitter() {
        return this.selectEventEmitter;
    }
}