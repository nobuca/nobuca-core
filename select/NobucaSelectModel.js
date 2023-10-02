import NobucaComponentModel from "../component/NobucaComponentModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaSelectOptionModel from "./NobucaSelectOptionModel.js";

export default class NobucaSelectModel extends NobucaComponentModel {

    constructor() {
        super();
        this.enabled = true;
        this.focused = false;
        this.value = null;
        this.options = new Array();
        this.selectedOption = null;
        this.valueChangedEventEmitter = new NobucaEventEmitter();
        this.addOptionEventEmitter = new NobucaEventEmitter();
        this.focusEventEmitter = new NobucaEventEmitter();
        this.enabledChangedEventEmitter = new NobucaEventEmitter();
    }

    getEnabled() {
        return this.enabled;
    }

    disable() {
        this.enabled = false;
        this.getEnabledChangedEventEmitter().emit();
    }

    enable() {
        this.enabled = true;
        this.getEnabledChangedEventEmitter().emit();
    }

    getOptions() {
        return this.options;
    }

    getClassName() {
        return "NobucaSelectModel";
    }

    getValueChangedEventEmitter() {
        return this.valueChangedEventEmitter;
    }

    getAddOptionEventEmitter() {
        return this.addOptionEventEmitter;
    }

    getEnabledChangedEventEmitter() {
        return this.enabledChangedEventEmitter;
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

    addOption(hiddenValue, visibleValue) {
        let option = new NobucaSelectOptionModel(hiddenValue, visibleValue);
        this.options.push(option);
        this.getAddOptionEventEmitter().emit(option);

        if (this.value == null) {
            this.value = hiddenValue;
        }
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }
}