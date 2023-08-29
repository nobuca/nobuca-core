import NobucaAppModel from "../app/NobucaAppModel.js";
import NobucaButtonModel from "../button/NobucaButtonModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaDialogModel {

    constructor(width, height, title) {
        this.width = width;
        this.height = height;
        if (title == null) {
            this.title = "Default";
        } else {
            this.title = title;
        }
        this.children = new Array();
        this.buttons = new Array();
        this.closeEventEmitter = new NobucaEventEmitter();
        this.addChildEventEmitter = new NobucaEventEmitter();
        this.clearChildrenEventEmitter = new NobucaEventEmitter();
        this.addButtonEventEmitter = new NobucaEventEmitter();
        this.clearButtonsEventEmitter = new NobucaEventEmitter();
        NobucaAppModel.showDialog(this);
    }

    getClassName() {
        return "NobucaDialogModel";
    }

    getTitle() {
        return this.title;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getButtons() {
        return this.buttons;
    }

    getCloseEventEmitter() {
        return this.closeEventEmitter;
    }

    getAddChildEventEmitter() {
        return this.addChildEventEmitter;
    }

    getClearChildrenEventEmitter() {
        return this.clearChildrenEventEmitter;
    }

    getAddButtonEventEmitter() {
        return this.addButtonEventEmitter;
    }

    getClearButtonsEventEmitter() {
        return this.clearButtonsEventEmitter;
    }

    close() {
        this.getCloseEventEmitter().emit();
    }

    addChild(child) {
        this.children.push(child);
        this.getAddChildEventEmitter().emit(child);
    }

    clearChildren() {
        this.children = [];
        this.getClearChildrenEventEmitter().emit();
    }

    clearButtons() {
        this.buttons = [];
        this.getClearButtonsEventEmitter().emit();
    }

    addButton(id, text, enabled) {
        let button = new NobucaButtonModel(id, text, enabled);
        this.getButtons().push(button);
        this.getAddButtonEventEmitter().emit(button);
        return button;
    }

    enableButton(id) {
        let button = this.getButtonById(id);
        if (button == null) return;
        button.enable();
    }

    disableButton(id) {
        let button = this.getButtonById(id);
        if (button == null) return;
        button.disable();
    }

    enableAcceptButton() {
        this.enableButton("accept");
    }

    disableAcceptButton() {
        this.disableButton("accept");
    }

    getButtonById(id) {
        return this.getButtons().find(button => button.getId() === id);
    }

    addAcceptButton() {
        return this.addButton("accept", "Accept");
    }

    addYesButton() {
        return this.addButton("yes", "Yes");
    }

    addNoButton() {
        return this.addButton("no", "No");
    }

    addOkButton() {
        return this.addButton("ok", "Ok");
    }

    addCancelButton() {
        return this.addButton("cancel", "Cancel");
    }

    addBackButton() {
        return this.addButton("back", "< Back");
    }
}