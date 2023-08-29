import NobucaEventEmitter from '../event/NobucaEventEmitter.js';
import NobucaDialogModel from './NobucaDialogModel.js';
import NobucaLabelModel from '../label/NobucaLabelModel.js';

export default class NobucaLoadingDialogModel {

    constructor() {

        this.result = new NobucaEventEmitter();

        this.dialog = new NobucaDialogModel(600, 170);

        let label = new NobucaLabelModel('Loading...');
        this.dialog.addChild(label);
    }

    getResult() {
        return this.result;
    }

    getDialog() {
        return this.dialog;
    }

    close() {
        this.getDialog().close();
    }
}