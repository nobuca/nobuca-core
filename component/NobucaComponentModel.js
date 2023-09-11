import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaPanelLayoutModel from "../layout/NobucaLayoutModel.js";

export default class NobucaComponentModel {

    constructor() {
        this.layout = new NobucaPanelLayoutModel();
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    createEventEmitter() {
        return new NobucaEventEmitter();
    }
    
    getLayout() {
        return this.layout;
    }

}
