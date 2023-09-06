import NobucaTreeNodeWithoutChildrenView from "./NobucaTreeNodeWithoutChildrenView.js";
import NobucaTreeNodeWithChildrenView from "./NobucaTreeNodeWithChildrenView.js";

export default class NobucaTreeNodeView {
    constructor(nodeModel) {
        this.nodeModel = nodeModel;
        this.nativeElement = this.createDiv();
        this.createNodeWithoutChildren();
        this.createNodeWithChildren();

        if (this.nodeModel.getSelected()) {
            this.paintAsSelected();
        } else {
            this.paintAsDeselected();
        }

        this.listenNodeModel();
    }

    getNodeModel() {
        return this.nodeModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNode";
        return div;
    }

    createNodeWithoutChildren() {
        this.nodeWithoutChildrenView = new NobucaTreeNodeWithoutChildrenView(
            this.nodeModel
        );
        this.nativeElement.appendChild(this.nodeWithoutChildrenView.getNativeElement());
    }

    createNodeWithChildren() {
        this.nodeWithChildrenView = new NobucaTreeNodeWithChildrenView(
            this.nodeModel
        );
        this.nativeElement.appendChild(this.nodeWithChildrenView.getNativeElement());
    }

    getNodeWithChildrenView() {
        return this.nodeWithChildrenView;
    }

    getContextMenuView() {
        return this.contextMenuView;
    }

    paintAsSelected() {
        this.nativeElement.classList.add("selected");
    }

    paintAsDeselected() {
        this.nativeElement.classList.remove("selected");
    }

    clearNodes() {
        this.getNodeWithChildrenView().clearNodes();
    }

    listenNodeModel() {
        this.getNodeModel().getSelectEventEmitter().subscribe(() => {
            this.paintAsSelected();
        });
        this.getNodeModel().getDeselectEventEmitter().subscribe(() => {
            this.paintAsDeselected();
        });
        this.getNodeModel().getClearNodesEventEmitter().subscribe(() => {
            this.clearNodes();
        });
    }

}