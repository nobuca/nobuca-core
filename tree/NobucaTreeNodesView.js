import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaTreeNodeView from "./NobucaTreeNodeView.js";

export default class NobucaTreeNodesView extends NobucaComponentView{
    constructor(treeModel) {
        super(treeModel)        
        this.nodeViewList = [];
        this.nodeSelected = new NobucaEventEmitter();
        this.nodeAddedToSelection = new NobucaEventEmitter();
        this.nodeRemovedToSelection = new NobucaEventEmitter();
        this.contextMenuItemClicked = new NobucaEventEmitter();
    }

    getNodeViewList() {
        return this.nodeViewList;
    }

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodes";
        this.setNativeElement(div);
        this.createNodes();        
    }

    createNodes() {
        this.nodeViewList = [];
        this.getModel().getNodes().forEach((nodeModel) => {
            this.createNode(nodeModel);
        });
    }

    createNode(nodeModel) {
        let nodeView = new NobucaTreeNodeView(nodeModel);
        this.getNativeElement().appendChild(nodeView.getNativeElement());
        this.nodeViewList.push(nodeView);
        return nodeView;
    }

    clearNodes() {
        while (this.getNativeElement().childNodes.length > 0) {
            this.getNativeElement().removeChild(this.getNativeElement().childNodes[0]);
        }
    }

    removeNode(nodeModel) {
        let nodeView = this.getNodeViewList().find(nv => nv.getModel() == nodeModel);
        if (nodeView == null) return;
        let index = this.getNodeViewList().indexOf(nodeView);
        if (index < 0) return;
        this.getNodeViewList().splice(index, 1);
        this.getNativeElement().removeChild(nodeView.getNativeElement());
    }

    listenModel() {
       
        this.getModel().getAddNodeEventEmitter().subscribe((event) => {
            this.createNode(event.childNode);
        });

        this.getModel().getClearNodesEventEmitter().subscribe(() => {
            this.clearNodes();
        });
    }
}