import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaLabelModel extends NobucaComponentModel {

    constructor(text) {
        super();
        this.text = text;
        if(this.text == null) {
            this.text = "";
        }
        this.textChangedEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaLabelModel";
    }

    getText() {
        return this.text;
    }

    setText(text) {
        this.text = text;
        this.getTextChangedEventEmitter().emit();
    }

    getTextChangedEventEmitter() {
        return this.textChangedEventEmitter;
    }

    setBold(bold) {
        this.bold = bold;
    }

    getBold() {
        return this.bold;
    }
}