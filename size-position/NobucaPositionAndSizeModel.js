import NobucaPosition from "../size-position/NobucaPosition.js";
import NobucaSize from "../size-position/NobucaSize.js";
import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaPositionAndSizeModel extends NobucaComponentModel {
    constructor() {
        super();
        this.position = new NobucaPosition();
        this.size = new NobucaSize();
    }

    getPosition() {
        return this.position;
    }

    getSize() {
        return this.size;
    }

    setParent(parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }
}