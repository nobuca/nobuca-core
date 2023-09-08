import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaDialogModel from './NobucaDialogModel.js';
import NobucaLabelModel from '../label/NobucaLabelModel.js';

export default class NobucaConfirmDialogModel {

    constructor(message) {

        this.resultYesEventEmitter = new NobucaEventEmitter();

        this.dialog = new NobucaDialogModel(600, 170, "Confirm");

        let label = new NobucaLabelModel(message);
        this.getDialog().addChild(label);

        let yesButton = this.getDialog().addYesButton();
        yesButton.getClickedEventEmitter().subscribe(() => {
            this.getDialog().close();
            this.getResultYesEventEmitter().emit();
        });
        yesButton.focus();

        this.getDialog().addNoButton().getClickedEventEmitter().subscribe(() => {
            this.getDialog().close();
        });
    }

    getResultYesEventEmitter() {
        return this.resultYesEventEmitter;
    }

    getDialog() {
        return this.dialog;
    }

    close() {
        this.getDialog().close();
    }
}