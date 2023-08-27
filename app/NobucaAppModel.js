import NobucaFactory from "../factory/NobucaFactory.js";
import NobucaPanelModel from "../panel/NobucaPanelModel.js";
import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";
import NobucaAppView from "../app/NobucaAppView.js";

export default class NobucaAppModel {

    constructor() {
        this.rootPanel = this.createRootPanel();
        this.showDialogEventEmitter = new NobucaUiEventEmitter();
        
        NobucaFactory.registerDefaultViewConstructors();
        NobucaFactory.createNewViewForModel(this);
    }

    getClassName() {
        return "NobucaAppModel";
    }

    createRootPanel() {
        return new NobucaPanelModel("vertical");
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