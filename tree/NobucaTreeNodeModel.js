import NobucaContextMenuModel from '../context-menu/NobucaContextMenuModel.js';
import NobucaUiEventEmitter from '../event/NobucaUiEventEmitter.js';

export default class NobucaTreeNodeModel {

    constructor(text, data) {
        this.parentNodeModel = null;
        this.expanded = false;
        this.selected = false;
        this.iconSrc = null;
        this.iconClassName = null;
        this.iconColor = null;
        this.text = text;
        this.data = data;
        this.dragAttributes = [];
        this.nodes = [];
        this.createContextMenu();
        this.contextMenuItemClickEventEmitter = new NobucaUiEventEmitter();
        this.doubleClickEventEmitter = new NobucaUiEventEmitter();
        this.textChangeEventEmitter = new NobucaUiEventEmitter();
        this.selectEventEmitter = new NobucaUiEventEmitter();
        this.childNodeSelectEventEmitter = new NobucaUiEventEmitter();
        this.deselectEventEmitter = new NobucaUiEventEmitter();
        this.addedToSelectionEventEmitter = new NobucaUiEventEmitter();
        this.removedToSelectionEventEmitter = new NobucaUiEventEmitter();
        this.expandEventEmitter = new NobucaUiEventEmitter();
        this.collapseEventEmitter = new NobucaUiEventEmitter();
        this.addNodeEventEmitter = new NobucaUiEventEmitter();
        this.childNodeAddNodeEventEmitter = new NobucaUiEventEmitter();
        this.clearNodesEventEmitter = new NobucaUiEventEmitter();
    }

    createContextMenu() {
        this.contextMenu = new NobucaContextMenuModel();
        this.contextMenu.getMenuItemClickEventEmitter().subscribe(event => {
            this.contextMenuItemClickEventEmitter.emit({ node: this, menuItem: event });
        });
    }

    getContextMenu() {
        return this.contextMenu;
    }

    getSelected() {
        return this.selected;
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

    setIconSrc(iconSrc) {
        this.iconSrc = iconSrc;
    }

    getIconSrc() {
        return this.iconSrc;
    }

    setIconClassName(iconClassName) {
        this.iconClassName = iconClassName;
    }

    getIconClassName() {
        return this.iconClassName;
    }

    setIconColor(iconColor) {
        this.iconColor = iconColor;
    }

    getIconColor() {
        return this.iconColor;
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

    setText(text) {
        this.text = text;
        this.getTextChangeEventEmitter().emit(this.text);
    }

    getText() {
        return this.text;
    }

    getTextChangeEventEmitter() {
        return this.textChangeEventEmitter;
    }

    getData() {
        return this.data;
    }

    getNodes() {
        return this.nodes;
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