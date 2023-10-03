import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaPanelModel from "../panel/NobucaPanelModel.js";

export default class NobucaDialogModel extends NobucaPanelModel {

    static showDialogEventEmitter = new NobucaEventEmitter();

    constructor(width, height, title, iconSrc) {
        super();
        this.width = width;
        this.height = height;
        this.title = title;
        this.iconSrc = iconSrc;
        this.closeEventEmitter = new NobucaEventEmitter();
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

    static setDefaultIconSrc(defaultIconSrc) {
        NobucaDialogModel.defaultIconSrc = defaultIconSrc;
    }

    static getDefaultIconSrc() {
        return NobucaDialogModel.defaultIconSrc;
    }

    getClassName() {
        return "NobucaDialogModel";
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

    getCloseEventEmitter() {
        return this.closeEventEmitter;
    }

    close() {
        this.getCloseEventEmitter().emit();
    }

    show() {
        NobucaDialogModel.setActiveDialog(this);
        NobucaDialogModel.getShowDialogEventEmitter().emit(this);
    }

}