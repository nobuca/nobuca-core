import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaPanelSplitLeftRightModel extends NobucaComponentModel {

    constructor(leftPanel, rightPanel, weight) {
        super();
        this.leftPanel = leftPanel;
        this.rightPanel = rightPanel;
        this.weight = weight;
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