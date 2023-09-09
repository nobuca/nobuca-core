import NobucaComponentModel from '../component/NobucaComponentModel.js';

export default class NobucaTreeNodeIconModel extends NobucaComponentModel {

    constructor(src) {
        super();
        this.src = src;
    }

    getClassName() {
        return "NobucaTreeNodeIconModel";
    }

    setSrc(src) {
        this.src = src;
    }

    getSrc() {
        return this.src;
    }
}