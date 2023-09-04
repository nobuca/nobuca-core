import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaImageModel extends NobucaComponentModel {

    constructor(src) {
        super();
        this.src = src;
        if(this.src == null) {
            this.src = "";
        }
        this.srcChangedEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaImageModel";
    }

    getSrc() {
        return this.src;
    }

    setSrc(src) {
        this.src = src;
        this.getSrcChangedEventEmitter().emit();
    }

    getSrcChangedEventEmitter() {
        return this.srcChangedEventEmitter;
    }
}