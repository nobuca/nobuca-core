import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaButtonBarModel extends NobucaComponentModel {

    constructor() {
        super();
        this.items = [];
    }

    getClassName() {
        return "NobucaButtonBarModel";
    }

    getItems() {
        return this.items;
    }

    addItem(item) {
        this.getItems().push(item);
        return item;
    }


}