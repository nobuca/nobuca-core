import NobucaAppModel from "../app/NobucaAppModel.js";
import NobucaButtonModel from "../button/NobucaButtonModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaPanelModel from "../panel/NobucaPanelModel.js";

export default class NobucaDialogModel {

    static showDialogEventEmitter = new NobucaEventEmitter();

    constructor(width, height, title, iconSrc) {
        this.width = width;
        this.height = height;
        this.title = title;
        this.iconSrc = iconSrc;
        this.subheader = new NobucaPanelModel();
        this.children = new Array();
        this.buttons = new Array();
        this.closeEventEmitter = new NobucaEventEmitter();
        this.childAddedEventEmitter = new NobucaEventEmitter();
        this.clearChildrenEventEmitter = new NobucaEventEmitter();
        this.addButtonEventEmitter = new NobucaEventEmitter();
        this.clearButtonsEventEmitter = new NobucaEventEmitter();
    }

    static setActiveDialog(activeDialog) {
        NobucaDialogModel.activeDialog = activeDialog;
    }

    static getActiveDialog() {
        return NobucaDialogModel.activeDialog;
    }

    static showDialog(dialog) {
        NobucaDialogModel.setActiveDialog(dialog);
        NobucaDialogModel.getShowDialogEventEmitter().emit(NobucaDialogModel.getActiveDialog());
    }

    static getShowDialogEventEmitter() {
        return NobucaDialogModel.showDialogEventEmitter;
    }

    getClassName() {
        return "NobucaDialogModel";
    }

    getSubheader() {
        return this.subheader;
    }

    getTitle() {
        return this.title;
    }

    getIconSrc() {
        return this.iconSrc;
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

    getChildAddedEventEmitter() {
        return this.childAddedEventEmitter;
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

    getChildren() {
        return this.children;
    }

    addChild(child) {
        this.children.push(child);
        this.getChildAddedEventEmitter().emit(child);
        return child;
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

    show() {
        NobucaDialogModel.setActiveDialog(this);
        NobucaDialogModel.getShowDialogEventEmitter().emit(this);
    }

}