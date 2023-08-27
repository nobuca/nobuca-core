export default class NobucaDynamicPanelVerticalDividerModel {
    constructor() {
        this.draggedEventEmiiter = new NobucaUiEventEmitter();
    }

    getClassName() {
        return "NobucaDynamicPanelVerticalDividerModel";
    }

    getDraggedEventEmitter() {
        return this.draggedEventEmiiter;
    }
}