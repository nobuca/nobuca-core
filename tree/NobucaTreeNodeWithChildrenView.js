import NobucaComponentView from '../component/NobucaComponentView.js';
import NobucaTreeNodeView from './NobucaTreeNodeView.js';

export default class NobucaTreeNodeWithChildrenView extends NobucaComponentView {

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeWithChildren";
        this.setNativeElement(div);
        this.nodeViewList = [];
        this.createChildNodes();
        this.updateView();
    }

    getNodeViewList() {
        return this.nodeViewList;
    }

    updateView() {
        if (this.getModel().getExpanded()) {
            this.getNativeElement().style.display = '';
        } else {
            this.getNativeElement().style.display = 'none';
        }
    }

    createChildNodes() {
        this.getModel().getNodes().forEach(childNodeModel => {
            this.createChildNode(childNodeModel);
        })
    }

    createChildNode(childNodeModel) {
        let childNodeView = new NobucaTreeNodeView(childNodeModel);
        this.getNativeElement().appendChild(childNodeView.getNativeElement());
        this.getNodeViewList().push(childNodeView);
    }

    clearNodes() {
        while (this.getNativeElement().childNodes.length > 0) {
            this.getNativeElement().removeChild(this.getNativeElement().childNodes[0]);
        }
    }

    listenModel() {
        this.getModel().getAddNodeEventEmitter().subscribe(event => {
            this.createChildNode(event.childNode);
        });

        this.getModel().getExpandEventEmitter().subscribe(() => {
            this.updateView();
        });

        this.getModel().getCollapseEventEmitter().subscribe(() => {
            this.updateView();
        });
    }
}