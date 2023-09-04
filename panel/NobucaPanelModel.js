import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaPanelModel extends NobucaComponentModel {
    constructor(direction) {
        super();
        this.children = [];
        this.addChildEventEmitter = new NobucaEventEmitter();
        this.removeChildEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaPanelModel";
    }

    getChildren() {
        return this.children;
    }

    addChild(child) {
        this.getChildren().push(child);
        child.parent = this;
        this.getAddChildEventEmitter().emit(child);
        return child;
    }

    removeChild(childToBeRemoved) {
        this.children = this.getChildren().filter(child => child != childToBeRemoved);
        this.getRemoveChildEventEmitter().emit(child);
    }

    clear() {
        this.getChildren().forEach(child => this.removeChild(child));
    }

    getAddChildEventEmitter() {
        return this.addChildEventEmitter;
    }

    getRemoveChildEventEmitter() {
        return this.removeChildEventEmitter;
    }
}