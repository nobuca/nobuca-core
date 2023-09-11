import NobucaFactory from "../factory/NobucaFactory.js";
import NobucaPanelModel from "../panel/NobucaPanelModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaAppModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createRootPanel();
        this.showDialogEventEmitter = new NobucaEventEmitter();
        this.titleChangedEventEmitter = new NobucaEventEmitter();
    }

    getClassName() {
        return "NobucaAppModel";
    }

    setTitle(title) {
        this.title = title;
        this.getTitleChangedEventEmitter().emit();
    }

    getTitle() {
        return this.title;
    }

    getTitleChangedEventEmitter() {
        return this.titleChangedEventEmitter;
    }

    createRootPanel() {
        this.rootPanel = new NobucaPanelModel();
        this.rootPanel.setId("rootPanel");
    }

    getRootPanel() {
        return this.rootPanel;
    }

    showDialog(dialog) {
        this.getShowDialogEventEmitter().emit(dialog);
    }

    getShowDialogEventEmitter() {
        return this.showDialogEventEmitter;
    }
}