import NobucaComponentModel from '../component/NobucaComponentModel.js';
import NobucaContextMenuModel from '../context-menu/NobucaContextMenuModel.js';
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaTreeNodeModel extends NobucaComponentModel {

    constructor() {
        super();

        this.parentNodeModel = null;
        this.expanded = false;
        this.selected = false;

        this.rightSideComponents = [];
        this.leftSideComponents = [];

        this.dragAttributes = [];
        this.nodes = [];

        this.createContextMenu();

        this.contextMenuItemClickEventEmitter = new NobucaEventEmitter();
        this.doubleClickEventEmitter = new NobucaEventEmitter();
        this.selectEventEmitter = new NobucaEventEmitter();
        this.childNodeSelectEventEmitter = new NobucaEventEmitter();
        this.deselectEventEmitter = new NobucaEventEmitter();
        this.addedToSelectionEventEmitter = new NobucaEventEmitter();
        this.removedToSelectionEventEmitter = new NobucaEventEmitter();
        this.expandEventEmitter = new NobucaEventEmitter();
        this.collapseEventEmitter = new NobucaEventEmitter();
        this.addNodeEventEmitter = new NobucaEventEmitter();
        this.childNodeAddNodeEventEmitter = new NobucaEventEmitter();
        this.clearNodesEventEmitter = new NobucaEventEmitter();
        this.componentsChangedEventEmitter = new NobucaEventEmitter();
    }

    createContextMenu() {
        this.contextMenu = new NobucaContextMenuModel();
        this.contextMenu.getMenuItemClickedEventEmitter().subscribe(event => {
            this.contextMenuItemClickEventEmitter.emit({ node: this, menuItem: event });
        });
    }

    getContextMenu() {
        return this.contextMenu;
    }

    getSelected() {
        return this.selected;
    }

    getRightSideComponents() {
        return this.rightSideComponents;
    }

    addRightSideComponent(component) {
        this.getRightSideComponents().push(component);
        this.getComponentsChangedEventEmitter().emit();
        return component;
    }

    getLeftSideComponents() {
        return this.leftSideComponents;
    }

    addLeftSideComponent(component) {
        this.getLeftSideComponents().push(component);
        this.getComponentsChangedEventEmitter().emit();
        return component;
    }

    getContextMenuItemClickEventEmitter() {
        return this.contextMenuItemClickEventEmitter;
    }

    getDoubleClickEventEmitter() {
        return this.doubleClickEventEmitter;
    }

    getExpandEventEmitter() {
        return this.expandEventEmitter;
    }

    getCollapseEventEmitter() {
        return this.collapseEventEmitter;
    }

    getExpandEventEmitter() {
        return this.expandEventEmitter;
    }

    getSelectEventEmitter() {
        return this.selectEventEmitter;
    }

    getDeselectEventEmitter() {
        return this.deselectEventEmitter;
    }

    getChildNodeSelectEventEmitter() {
        return this.childNodeSelectEventEmitter;
    }

    getAddedToSelectionEventEmitter() {
        return this.addedToSelectionEventEmitter;
    }

    getRemovedFromSelectionEventEmitter() {
        return this.removedFromSelectionEventEmitter;
    }

    getAddNodeEventEmitter() {
        return this.addNodeEventEmitter;
    }

    getChildNodeAddNodeEventEmitter() {
        return this.childNodeAddNodeEventEmitter;
    }

    getClearNodesEventEmitter() {
        return this.clearNodesEventEmitter;
    }

    getComponentsChangedEventEmitter() {
        return this.componentsChangedEventEmitter;
    }

    getExpanded() {
        return this.expanded;
    }

    expand() {
        this.expanded = true;
        this.expandEventEmitter.emit(this);
    }

    collapse() {
        this.expanded = false;
        this.collapseEventEmitter.emit(this);
    }

    select() {
        this.selected = true;
        this.getSelectEventEmitter().emit(this);
    }

    unselect() {
        this.selected = false;
        this.getDeselectEventEmitter().emit(this);
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    getNodes() {
        return this.nodes;
    }

    setTree(tree) {
        this.tree = tree;
        this.getNodes().forEach(node => node.setTree(this.getTree()));
    }

    getTree() {
        return this.tree;
    }

    addNode(node) {

        node.parentNode = this;

        this.nodes.push(node);

        node.getSelectEventEmitter().subscribe(() => {
            this.getChildNodeSelectEventEmitter().emit(node);
        });

        node.getChildNodeSelectEventEmitter().subscribe(childNode => {
            this.getChildNodeSelectEventEmitter().emit(childNode);
        });

        node.getAddNodeEventEmitter().subscribe(event => {
            this.getChildNodeAddNodeEventEmitter().emit(event);
        });

        node.getChildNodeAddNodeEventEmitter().subscribe(event => {
            this.getChildNodeAddNodeEventEmitter().emit(event);
        });

        this.getAddNodeEventEmitter().emit({ parentNode: this, childNode: node });

        node.setTree(this.getTree());

        return node;
    }

    clearNodes() {
        this.nodes = [];
        this.getClearNodesEventEmitter().emit();
    }

    getDepth() {
        if (this.parentNode == null) return 0;
        return 1 + this.parentNode.getDepth();
    }

    findNodeByData(data) {
        let nodeModel = null;
        let i = 0;
        while (nodeModel == null && i < this.getNodes().length) {
            if (this.getNodes()[i].getData() == data) {
                nodeModel = this.getNodes()[i];
            } else {
                nodeModel = this.getNodes()[i].findNodeByData(data);
            }
            i++;
        }
        return nodeModel;
    }

    startDrag() {
        this.dragging = true;
    }

    setDragAttribute(name, value) {
        let dragAttribute = new Object();
        dragAttribute.name = name;
        dragAttribute.value = value;
        this.dragAttributes.push(dragAttribute);
    }

    getDragAttribute(name) {
        let dragAttribute = this.dragAttributes.find(dragAttribute => dragAttribute.name == name);
        if (dragAttribute == null) return null;
        return dragAttribute.value;
    }
}