import NobucaFactory from "../factory/NobucaFactory.js";
import NobucaPanelModel from "../panel/NobucaPanelModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaAppModel {

    constructor() {
        this.createRootPanel();
        this.showDialogEventEmitter = new NobucaEventEmitter();
        this.titleChangedEventEmitter = new NobucaEventEmitter();
        
        NobucaFactory.registerDefaultViewConstructors();
        NobucaFactory.createNewViewForModel(this);
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
        this.rootPanel = new NobucaPanelModel("vertical");
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