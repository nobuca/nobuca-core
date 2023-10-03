import NobucaTreeNodeIndentView from './NobucaTreeNodeIndentView.js';
import NobucaTreeNodeExpandCollapseButtonView from './NobucaTreeNodeExpandCollapseButtonView.js';
import NobucaContextMenuView from '../context-menu/NobucaContextMenuView.js';
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';
import NobucaComponentView from '../component/NobucaComponentView.js';
import NobucaFactory from '../factory/NobucaFactory.js';

export default class NobucaTreeNodeWithoutChildrenView extends NobucaComponentView {

    createNativeElement() {

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
                this.getModel().select();
            }
            event.stopPropagation();
        });

        div.addEventListener("contextmenu", event => {
            if (event.ctrlKey) return;
            event.preventDefault();
            if (this.contextMenuView.getContextMenuModel().hasMenuItems()) {
                this.getModel().select();
                this.contextMenuView.show(event.x, event.y);
                event.stopPropagation();
            }
        });

        div.addEventListener('dblclick', event => {
            window.getSelection().removeAllRanges();
            this.getModel().select();
            this.getModel().getDoubleClickEventEmitter().emit(this);
            event.stopPropagation();
        });

        this.setNativeElement(div);

        this.createIndent();
        this.createExpandCollapseButton();
        this.createContextMenuView();

        this.createComponents()
    }

    createIndent() {
        let depth = this.getModel().getDepth();
        for (let i = 0; i < depth; i++) {
            this.nodeIdentView = new NobucaTreeNodeIndentView(this.getModel());
            this.getNativeElement().appendChild(this.nodeIdentView.getNativeElement());
        }
    }

    createExpandCollapseButton() {
        this.nodeExpandCollapseButton = new NobucaTreeNodeExpandCollapseButtonView(this.getModel());
        this.getNativeElement().appendChild(this.nodeExpandCollapseButton.getNativeElement());
    }

    createComponents() {
        this.createLeftSideComponents();
        this.createRightSideComponents();
    }

    recreateComponents() {
        this.clearComponents();
        this.addComponents();
    }

    addComponents() {
        this.addLeftSideComponents();
        this.addRightSideComponents();
    }

    clearComponents() {
        this.removeChildren(this.getDivLeftSideComponents());
        this.removeChildren(this.getDivRightSideComponents());
    }

    createRightSideComponents() {

        this.divRightSideComponents = document.createElement("div");
        this.divRightSideComponents.className = "NobucaTreeNodeWithoutChildrenRightSideComponents";
        this.getNativeElement().appendChild(this.divRightSideComponents);

        this.addRightSideComponents();
    }

    addRightSideComponents() {
        this.getModel().getRightSideComponents().forEach(componentModel => this.createRightSideComponent(componentModel));
    }

    getDivRightSideComponents() {
        return this.divRightSideComponents;
    }

    createLeftSideComponents() {

        this.divLeftSideComponents = document.createElement("div");
        this.divLeftSideComponents.className = "NobucaTreeNodeWithoutChildrenLeftSideComponents";
        this.getNativeElement().appendChild(this.divLeftSideComponents);

        this.addLeftSideComponents();
    }

    addLeftSideComponents() {
        this.getModel().getLeftSideComponents().forEach(componentModel => this.createLeftSideComponent(componentModel));
    }

    getDivLeftSideComponents() {
        return this.divLeftSideComponents;
    }

    createRightSideComponent(componentModel) {
        var componentView = NobucaFactory.createNewViewForModel(componentModel);
        this.getDivRightSideComponents().appendChild(componentView.getNativeElement());
    }

    createLeftSideComponent(componentModel) {
        var componentView = NobucaFactory.createNewViewForModel(componentModel);
        this.getDivLeftSideComponents().appendChild(componentView.getNativeElement());
    }

    createContextMenuView() {
        this.contextMenuView = new NobucaContextMenuView(this.getModel().getContextMenu());
        this.contextMenuItemClicked = new NobucaEventEmitter();
        this.getModel().getContextMenuItemClickEventEmitter().subscribe(event => {
            this.contextMenuItemClicked.emit({ nodeModel: this.getModel(), menuItemModel: event });
        });
    }

    configureDragAndDrop(div) {

        div.draggable = true;

        div.addEventListener("dragstart", event => {
            console.log("dragstart", event);
            event.dataTransfer.setData("node/data", JSON.stringify(this.getModel().getData()));
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

    listenModel() {

        this.getModel().getComponentsChangedEventEmitter().subscribe(() => {
            this.recreateComponents();
        });
    }
}