
export default class NobucaTreeNodeTextView {

    constructor(nodeModel) {
        this.nodeModel = nodeModel;
        this.nativeElement = this.createDiv();
        
        this.setText(this.getNodeModel().getText());

        this.nodeModel.getTextChangeEventEmitter().subscribe(text => {
            this.setText(text);
        });
    }

    getNodeModel() {
        return this.nodeModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeText";
        return div;
    }

    setText(text) {
        this.nativeElement.innerHTML = text;
    }
}
