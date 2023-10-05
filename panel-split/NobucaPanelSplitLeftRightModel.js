import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaPanelSplitLeftRightModel extends NobucaComponentModel {

    constructor(leftPanel, rightPanel, weight) {
        super();
        this.leftPanel = leftPanel;
        this.leftPanel.setParent(this);
        this.rightPanel = rightPanel;
        this.rightPanel.setParent(this);
        this.weight = weight;
        this.stateChangedEventEmitter = this.createEventEmitter();
    }

    getClassName() {
        return "NobucaPanelSplitLeftRightModel";
    }

    getLeftPanel() {
        return this.leftPanel;
    }

    getRightPanel() {
        return this.rightPanel;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }
}