import NobucaComponentModel from '../component/NobucaComponentModel.js';

export default class NobucaTreeNodeTextModel extends NobucaComponentModel {

    constructor(text) {
        super();
        this.text = text;
    }

    getClassName() {
        return "NobucaTreeNodeTextModel";
    }

    setText(text) {
        this.text = text;
    }

    getText() {
        return this.text;
    }
}