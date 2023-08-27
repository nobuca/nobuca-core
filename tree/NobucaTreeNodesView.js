import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";
import NobucaTreeNodeView from "./NobucaTreeNodeView.js";

export default class NobucaTreeNodesView {
    constructor(treeModel) {
        this.treeModel = treeModel;
        this.nativeElement = this.createDiv();
        this.nodeViewList = [];
        this.nodeSelected = new NobucaUiEventEmitter();
        this.nodeAddedToSelection = new NobucaUiEventEmitter();
        this.nodeRemovedToSelection = new NobucaUiEventEmitter();
        this.contextMenuItemClicked = new NobucaUiEventEmitter();

        this.treeModel.getNodes().forEach((nodeModel) => {
            this.createNode(nodeModel);
        });

        this.treeModel.getAddNodeEventEmitter().subscribe((event) => {
            this.createNode(event.childNode);
        });

        this.treeModel.getClearNodesEventEmitter().subscribe(() => {
            this.clearNodes();
        });
    }

    getTreeModel() {
        return this.treeModel;
    }

    getNodeViewList() {
        return this.nodeViewList;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodes";
        return div;
    }

    createNode(nodeModel) {
        let nodeView = new NobucaTreeNodeView(nodeModel);
        this.nativeElement.appendChild(nodeView.nativeElement);
        this.nodeViewList.push(nodeView);
    }

    clearNodes() {
        while (this.nativeElement.childNodes.length > 0) {
            this.nativeElement.removeChild(this.nativeElement.childNodes[0]);
        }
    }

    removeNode(nodeModel) {
        let nodeView = this.getNodeViewList().find(nv => nv.getNodeModel() == nodeModel);
        if (nodeView == null) return;
        let index = this.getNodeViewList().indexOf(nodeView);
        if (index < 0) return;
        this.getNodeViewList().splice(index, 1);
        this.nativeElement.removeChild(nodeView.nativeElement);
    }
}