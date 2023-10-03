import NobucaDialogModel from './NobucaDialogModel.js';
import NobucaLabelModel from '../label/NobucaLabelModel.js';
import NobucaPanelModel from '../panel/NobucaPanelModel.js';
import NobucaButtonModel from '../button/NobucaButtonModel.js';

export default class NobucaErrorDialogModel extends NobucaDialogModel {

    constructor(message) {
        super(600, 170, "Error");

        this.getLayout().setDirectionColumn();

        this.addChild(new NobucaLabelModel(message)).getLayout().setGrow(1).setAlignContentsTop();

        var right = this.addChild(new NobucaPanelModel());
        right.getLayout().setJustifyContentsRight();
        let okButton = right.addChild(new NobucaButtonModel("Ok"));
        okButton.getClickedEventEmitter().subscribe(() => {
            this.close();
        });

        this.show();

        okButton.focus();
    }
}