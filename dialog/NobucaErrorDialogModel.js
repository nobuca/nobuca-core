import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaDialogModel from './NobucaDialogModel.js';
import NobucaLabelModel from '../label/NobucaLabelModel.js';

export default class NobucaErrorDialogModel {

    constructor(message) {

        this.dialog = new NobucaDialogModel(600, 170, "Error");

        let label = new NobucaLabelModel(message);
        this.getDialog().addChild(label);

        let okButton = this.getDialog().addOkButton();
        okButton.getClickedEventEmitter().subscribe(() => {
            this.getDialog().close();
        });
        okButton.focus();
    }

    getDialog() {
        return this.dialog;
    }
}