import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaButtonbarModel extends NobucaComponentModel {

    constructor() {
        super();
        this.items = [];
    }

    getClassName() {
        return "NobucaButtonbarModel";
    }

    getItems() {
        return this.items;
    }

    addItem(item) {
        this.getItems().push(item);
        return item;
    }

    setMoveable(moveable) {
        this.moveable = moveable;
    }

    getMoveable() {
        return this.moveable;
    }

}