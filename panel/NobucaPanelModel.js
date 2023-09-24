import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaPanelModel extends NobucaComponentModel {
    constructor() {
        super();
        this.children = [];
        this.childAddedEventEmitter = new NobucaEventEmitter();
        this.childRemovedEventEmitter = new NobucaEventEmitter();
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
        this.getChildAddedEventEmitter().emit(child);
        return child;
    }

    removeChild(childToBeRemoved) {
        this.children = this.getChildren().filter(child => child != childToBeRemoved);
        this.getChildRemovedEventEmitter().emit(childToBeRemoved);
    }

    clear() {
        this.getChildren().forEach(child => this.removeChild(child));
    }

    getChildAddedEventEmitter() {
        return this.childAddedEventEmitter;
    }

    getChildRemovedEventEmitter() {
        return this.childRemovedEventEmitter;
    }

    setClickable(clickable) {
        this.clickable = true;
    }

    getClickable() {
        return this.clickable;
    }
}