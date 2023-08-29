import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaPanelModel extends NobucaComponentModel {
    constructor(direction) {
        super();
        this.children = [];
        this.addChildEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaPanelModel";
    }

    getChildren() {
        return this.children;
    }

    addChild(child) {
        this.children.push(child);
        child.parent = this;
        this.getAddChildEventEmitter().emit(child);
        return child;
    }

    getAddChildEventEmitter() {
        return this.addChildEventEmitter;
    }
}