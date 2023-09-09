import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaContextMenuView from "../context-menu/NobucaContextMenuView.js";
import NobucaTreeNodesView from "./NobucaTreeNodesView.js";

export default class NobucaTreeView extends NobucaComponentView{
    constructor(treeModel) {
        super(treeModel);
        this.createNodesView();
        this.createContextMenuView();
    }

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTree";

        div.addEventListener("contextmenu", (event) => {
            if (event.ctrlKey) return;
            event.preventDefault();
            if (this.contextMenuView.getContextMenuModel().hasMenuItems()) {
                this.contextMenuView.show(event.x, event.y);
            }
        });

        this.setNativeElement(div);
    }

    createNodesView() {
        this.nodesView = new NobucaTreeNodesView(this.getModel());
        this.getNativeElement().appendChild(this.getNodesView().getNativeElement());
    }

    getNodesView() {
        return this.nodesView;
    }

    getContextMenuView() {
        return this.contextMenuView;
    }

    setSize(width, height) {
        this.getNativeElement().style.width = width + "px";
        this.getNativeElement().style.height = height + "px";
    }

    setPosition(top, left) {
        this.getNativeElement().style.top = top + "px";
        this.getNativeElement().style.left = left + "px";
    }

    createContextMenuView() {
        this.contextMenuView = new NobucaContextMenuView(
            this.getModel().getContextMenu()
        );
    }

    listenModel() {
        this.getModel()
            .getRemoveNodeEventEmitter()
            .subscribe(nodeModel => {
                console.log("node removed");
                this.getNodesView().removeNode(nodeModel);
            });
    }
}