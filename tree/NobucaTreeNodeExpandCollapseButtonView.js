export default class NobucaTreeNodeExpandCollapseButtonView {

    constructor(nodeModel) {

        this.nodeModel = nodeModel;

        this.nativeElement = this.createDiv();

        this.paint();

        this.nodeModel.getExpandEventEmitter().subscribe(() => {
            this.paint();
        });

        this.nodeModel.getCollapseEventEmitter().subscribe(() => {
            this.paint();
        });

        this.nodeModel.getAddNodeEventEmitter().subscribe(() => {
            this.paint();
        });
    }

    getNodeModel() {
        return this.nodeModel;
    }

    getClickEventEmitter() {
        return this.clickEventEmitter;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeExpandCollapseButton";

        div.addEventListener('click', event => {
            if (this.getNodeModel().getExpanded()) {
                this.getNodeModel().collapse();
            } else {
                this.getNodeModel().expand();
            }
        });

        return div;
    }

    paint() {
        if (this.getNodeModel().getNodes().length === 0) {
            this.nativeElement.className = 'NobucaTreeNodeExpandCollapseButton';
        } else {
            if (this.getNodeModel().getExpanded()) {
                this.nativeElement.className = 'NobucaTreeNodeExpandCollapseButton far fa-minus-square';
            } else {
                this.nativeElement.className = 'NobucaTreeNodeExpandCollapseButton far fa-plus-square';
            }
        }
    }
}