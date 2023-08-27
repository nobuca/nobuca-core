
export default class NobucaTreeNodeIndentView {

    constructor(nodeModel) {
        this.nodeModel = nodeModel;
        this.nativeElement = this.createDiv();
    }

    getNodeModel() {
        return this.nodeModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeIndent";
        return div;
    }
}
