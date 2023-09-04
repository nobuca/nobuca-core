export default class NobucaDynamicPanelVerticalDividerModel {
    constructor() {
        this.draggedEventEmiiter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaDynamicPanelVerticalDividerModel";
    }

    getDraggedEventEmitter() {
        return this.draggedEventEmiiter;
    }
}