import NobucaTreeNodeWithoutChildrenView from "./NobucaTreeNodeWithoutChildrenView.js";
import NobucaTreeNodeWithChildrenView from "./NobucaTreeNodeWithChildrenView.js";
import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTreeNodeView extends NobucaComponentView {
    constructor(nodeModel) {
        super(nodeModel);

        this.createNodeWithoutChildren();
        this.createNodeWithChildren();

        if (this.getModel().getSelected()) {
            this.paintAsSelected();
        } else {
            this.paintAsDeselected();
        }
    }

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNode";
        this.setNativeElement(div);
    }

    createNodeWithoutChildren() {
        this.nodeWithoutChildrenView = new NobucaTreeNodeWithoutChildrenView(this.getModel());
        this.getNativeElement().appendChild(this.getNodeWithoutChildren().getNativeElement());
    }

    getNodeWithoutChildren() {
        return this.nodeWithoutChildrenView;
    }

    createNodeWithChildren() {
        this.nodeWithChildrenView = new NobucaTreeNodeWithChildrenView(this.getModel());
        this.getNativeElement().appendChild(this.getNodeWithChildrenView().getNativeElement());
    }

    getNodeWithChildrenView() {
        return this.nodeWithChildrenView;
    }

    getContextMenuView() {
        return this.contextMenuView;
    }

    paintAsSelected() {
        this.getNativeElement().classList.add("selected");
    }

    paintAsDeselected() {
        this.getNativeElement().classList.remove("selected");
    }

    clearNodes() {
        this.getNodeWithChildrenView().clearNodes();
    }

    listenModel() {
        this.getModel().getSelectEventEmitter().subscribe(() => {
            this.paintAsSelected();
        });
        this.getModel().getDeselectEventEmitter().subscribe(() => {
            this.paintAsDeselected();
        });
        this.getModel().getClearNodesEventEmitter().subscribe(() => {
            this.clearNodes();
        });
    }

}