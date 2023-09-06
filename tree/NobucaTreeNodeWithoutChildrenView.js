import NobucaTreeNodeTextView from './NobucaTreeNodeTextView.js';
import NobucaTreeNodeIndentView from './NobucaTreeNodeIndentView.js';
import NobucaTreeNodeExpandCollapseButtonView from './NobucaTreeNodeExpandCollapseButtonView.js';
import NobucaTreeNodeIconView from './NobucaTreeNodeIconView.js';
import NobucaContextMenuView from '../context-menu/NobucaContextMenuView.js';
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaTreeNodeWithoutChildrenView {

    constructor(nodeModel) {
        this.nodeModel = nodeModel;
        this.nativeElement = this.createDiv();
        this.createIndent();
        this.createExpandCollapseButton();
        this.createIcon();
        this.createText();
        this.createContextMenuView();
    }

    getNodeModel() {
        return this.nodeModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeWithoutChildren";

        this.configureDragAndDrop(div);

        div.addEventListener('click', event => {
            if (event.ctrlKey) {
                this.selected = !this.selected;
                if (this.selected) {
                    this.nodeAddedToSelection.emit(this);
                    this.selectedStateChanged();
                } else {
                    this.nodeRemovedToSelection.emit(this);
                    this.selectedStateChanged();
                }
            } else {
                this.getNodeModel().select();
            }
            event.stopPropagation();
        });

        div.addEventListener("contextmenu", event => {
            if (event.ctrlKey) return;
            event.preventDefault();
            if (this.contextMenuView.getContextMenuModel().hasMenuItems()) {
                this.getNodeModel().select();
                this.contextMenuView.show(event.x, event.y);
                event.stopPropagation();
            }
        });

        div.addEventListener('dblclick', event => {
            window.getSelection().removeAllRanges();
            this.getNodeModel().select();
            this.getNodeModel().getDoubleClickEventEmitter().emit(this);
            event.stopPropagation();
        });

        return div;
    }

    createIndent() {
        let depth = this.nodeModel.getDepth();
        for (let i = 0; i < depth; i++) {
            this.nodeIdentView = new NobucaTreeNodeIndentView(this.nodeModel);
            this.nativeElement.appendChild(this.nodeIdentView.getNativeElement());
        }
    }

    createExpandCollapseButton() {
        this.nodeExpandCollapseButton = new NobucaTreeNodeExpandCollapseButtonView(this.nodeModel);
        this.nativeElement.appendChild(this.nodeExpandCollapseButton.nativeElement);
    }

    createIcon() {
        this.nodeIconView = new NobucaTreeNodeIconView(this.nodeModel);
        this.nativeElement.appendChild(this.nodeIconView.getNativeElement());
    }

    createText() {
        this.nodeTextView = new NobucaTreeNodeTextView(this.nodeModel);
        this.nativeElement.appendChild(this.nodeTextView.getNativeElement());
    }

    createContextMenuView() {
        this.contextMenuView = new NobucaContextMenuView(this.nodeModel.getContextMenu());
        this.contextMenuItemClicked = new NobucaEventEmitter();
        this.nodeModel.getContextMenuItemClickEventEmitter().subscribe(event => {
            this.contextMenuItemClicked.emit({ nodeModel: this.nodeModel, menuItemModel: event });
        });
    }

    configureDragAndDrop(div) {

        div.draggable = true;

        div.addEventListener("dragstart", event => {
            console.log("dragstart", event);
            event.dataTransfer.setData("node/data", JSON.stringify(this.getNodeModel().getData()));
        });

        div.addEventListener("dragleave", event => {
            console.log("dragleave", event);
        });

        div.addEventListener("dragfinish", event => {
            console.log("dragfinish", event);
        });

        div.addEventListener("dragover", event => {
            console.log("dragover", event);
            event.preventDefault();
        });

        div.addEventListener("drop", event => {
            console.log("drop", event);
            let strNodeData = event.dataTransfer.getData("node/data");
            let nodeData = JSON.parse(strNodeData);
            console.log("drop.nodeData", nodeData);
        });
    }
}