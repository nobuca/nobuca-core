import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaDialogModel from './NobucaDialogModel.js';
import NobucaLabelModel from '../label/NobucaLabelModel.js';

export default class NobucaErrorDialogModel extends NobucaDialogModel {

    constructor(message) {
        super(600, 170, "Error");

        this.addChild(new NobucaLabelModel(message));

        let okButton = this.addOkButton();
        okButton.getClickedEventEmitter().subscribe(() => {
            this.getDialog().close();
        });
        okButton.focus();

        this.show();
    }
}