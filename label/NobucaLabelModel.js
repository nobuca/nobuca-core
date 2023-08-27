import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaLabelModel extends NobucaComponentModel {

    constructor(text) {
        super();
        this.text = text;
        if(this.text == null) {
            this.text = "";
        }
        this.textChangedEventEmitter = new NobucaUiEventEmitter();
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
}