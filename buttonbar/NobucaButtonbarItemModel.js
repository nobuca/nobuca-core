import NobucaPanelModel from "../panel/NobucaPanelModel.js";

export default class NobucaButtonbarItemModel extends NobucaPanelModel {

    constructor(imageSrc) {
        super();
        this.imageSrc = imageSrc;
    }

    setImageSrc(imageSrc) {
        this.imageSrc = imageSrc;
    }

    getImageSrc() {
        return this.imageSrc;
    }


}