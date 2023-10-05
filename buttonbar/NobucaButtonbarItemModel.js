import NobucaPanelModel from "../panel/NobucaPanelModel.js";

export default class NobucaButtonbarItemModel extends NobucaPanelModel {

    constructor(imageSrc) {
        super();
        this.imageSrc = imageSrc;
        this.clickedEventEmitter = this.createEventEmitter();
    }

    setImageSrc(imageSrc) {
        this.imageSrc = imageSrc;
    }

    getImageSrc() {
        return this.imageSrc;
    }

    getClickedEventEmitter() {
        return this.clickedEventEmitter;
    }

}