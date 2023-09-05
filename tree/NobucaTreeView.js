import NobucaContextMenuView from "../context-menu/NobucaContextMenuView.js";
import NobucaTreeNodesView from "./NobucaTreeNodesView.js";

export default class NobucaTreeView {
    constructor(treeModel) {
        this.treeModel = treeModel;
        this.nativeElement = this.createDiv();
        this.createNodesView();
        this.createContextMenuView();
        this.listenTreeModelEvents();
    }

    getTreeModel() {
        return this.treeModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTree";

        div.addEventListener("contextmenu", (event) => {
            if (event.ctrlKey) return;
            event.preventDefault();
            if (this.contextMenuView.getContextMenuModel().hasMenuItems()) {
                this.contextMenuView.show(event.x, event.y);
            }
        });

        return div;
    }

    createNodesView() {
        this.nodesView = new NobucaTreeNodesView(this.treeModel);
        this.nativeElement.appendChild(this.nodesView.nativeElement);
    }

    getNodesView() {
        return this.nodesView;
    }

    getContextMenuView() {
        return this.contextMenuView;
    }

    setSize(width, height) {
        this.nativeElement.style.width = width + "px";
        this.nativeElement.style.height = height + "px";
    }

    setPosition(top, left) {
        this.nativeElement.style.top = top + "px";
        this.nativeElement.style.left = left + "px";
    }

    createContextMenuView() {
        this.contextMenuView = new NobucaContextMenuView(
            this.treeModel.getContextMenu()
        );
    }

    updateContentsPositionAndSize() {
        this.setPosition(
            this.getTreeModel().getPosition().getTop(),
            this.getTreeModel().getPosition().getLeft()
        );
    }

    updateSizeFromModel() {
        this.setSize(
            this.getTreeModel().getSize().getWidth(),
            this.getTreeModel().getSize().getHeight()
        );
    }

    listenTreeModelEvents() {
        this.getTreeModel()
            .getSize()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updateSizeFromModel();
            });

        this.getTreeModel()
            .getPosition()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updateContentsPositionAndSize();
            });

        this.getTreeModel()
            .getRemoveNodeEventEmitter()
            .subscribe(nodeModel => {
                console.log("node removed");
                this.getNodesView().removeNode(nodeModel);
            });
    }
}