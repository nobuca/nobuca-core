import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaAppModel extends NobucaComponentModel {

    constructor() {
        super();
        this.showDialogEventEmitter = this.createEventEmitter();
        this.titleChangedEventEmitter = this.createEventEmitter();
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

    showDialog(dialog) {
        this.getShowDialogEventEmitter().emit(dialog);
    }

    getShowDialogEventEmitter() {
        return this.showDialogEventEmitter;
    }
}