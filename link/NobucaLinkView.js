export default class NobucaLabelView {

    constructor(linkModel) {
        this.linkModel = linkModel;
        this.nativeElement = this.createDiv();
    }

    getLabelModel() {
        return this.linkModel;
    }

    createDiv() {
        let link = document.createElement("a");
        link.className = "NobucaLink";
        if (this.getLabelModel().getLink() != null) {
            link.href = this.getLabelModel().getLink();
        }
        link.innerHTML = this.getLabelModel().getText();
        return link;
    }

}