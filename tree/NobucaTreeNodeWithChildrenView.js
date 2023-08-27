import NobucaTreeNodeView from './NobucaTreeNodeView.js';

export default class NobucaTreeNodeWithChildrenView {

    constructor(nodeModel) {

        this.nodeModel = nodeModel;

        this.nativeElement = this.createDiv();

        this.nodeViewList = [];

        this.createChildNodes();

        this.paint();

        this.nodeModel.getAddNodeEventEmitter().subscribe(event => {
            this.createChildNode(event.childNode);
        });

        this.nodeModel.getExpandEventEmitter().subscribe(() => {
            this.paint();
        });

        this.nodeModel.getCollapseEventEmitter().subscribe(() => {
            this.paint();
        });
    }

    getNodeModel() {
        return this.nodeModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeWithChildren";
        return div;
    }

    paint() {
        if (this.nodeModel.getExpanded()) {
            this.nativeElement.style.display = '';
        } else {
            this.nativeElement.style.display = 'none';
        }
    }

    createChildNodes() {
        this.getNodeModel().getNodes().forEach(childNodeModel => {
            this.createChildNode(childNodeModel);
        })
    }

    createChildNode(childNodeModel) {
        let childNodeView = new NobucaTreeNodeView(childNodeModel);
        this.nativeElement.appendChild(childNodeView.nativeElement);
        this.nodeViewList.push(childNodeView);
    }

    clearNodes() {
        while (this.nativeElement.childNodes.length > 0) {
            this.nativeElement.removeChild(this.nativeElement.childNodes[0]);
        }
    }
}