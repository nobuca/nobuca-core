import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaPanelLayoutModel from "../layout/NobucaLayoutModel.js";

export default class NobucaComponentModel {

    constructor() {
        this.layout = new NobucaPanelLayoutModel();
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    createEventEmitter() {
        return new NobucaEventEmitter();
    }
    
    getLayout() {
        return this.layout;
    }

    setTooltip(tooltip) {
        this.tooltip = tooltip;
        return this;
    }

    getTooltip() {
        return this.tooltip;
    }

    setParent(parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }
}
