import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaPanelSplitTopBottomModel extends NobucaComponentModel {

    constructor(topPanel, bottomPanel, weight) {
        super();
        this.topPanel = topPanel;
        this.bottomPanel = bottomPanel;
        this.weight = weight;
    }

    getClassName() {
        return "NobucaPanelSplitTopBottomModel";
    }

    getTopPanel() {
        return this.topPanel;
    }

    getBottomPanel() {
        return this.bottomPanel;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }
}