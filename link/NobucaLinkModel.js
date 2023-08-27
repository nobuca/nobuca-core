export default class NobucaLabelModel {

    constructor(text, link) {
        this.text = text;
        this.link = link;
    }

    getClassName() {
        return "NobucaLinkModel";
    }

    getText() {
        return this.text;
    }

    getLink() {
        return this.link;
    }

}