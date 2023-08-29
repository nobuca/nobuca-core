import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaFieldsetModel {

    constructor(text, radioName, radioValue, radioChecked) {
        this.enabled = true;
        this.text = text;
        this.radioName = radioName;
        this.radioValue = radioValue;
        this.radioChecked = radioChecked;
        this.children = new Array();
        this.addChildEventEmitter = new NobucaEventEmitter();
        this.radioCheckEventListener = new NobucaEventEmitter();
        this.radioUncheckEventListener = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaFieldsetModel";
    }

    getEnabled() {
        return this.enabled;
    }

    getText() {
        return this.text;
    }

    getRadioName() {
        return this.radioName;
    }

    getRadioValue() {
        return this.radioValue;
    }

    getRadioChecked() {
        return this.radioChecked;
    }

    checkRadio() {
        if (this.radioChecked) return;
        this.radioChecked = true;
        this.getRadioCheckEventListener().emit(this.radioChecked);
    }

    uncheckRadio() {
        if (!this.radioChecked) return;
        this.radioChecked = false;
        this.getRadioUncheckEventListener().emit(this.radioChecked);
    }

    getRadioCheckEventListener() {
        return this.radioCheckEventListener;
    }

    getRadioUncheckEventListener() {
        return this.radioUncheckEventListener;
    }

    getAddChildEventEmitter() {
        return this.addChildEventEmitter;
    }

    addChild(child) {
        this.children.push(child);
        this.getAddChildEventEmitter().emit(child);
    }
}