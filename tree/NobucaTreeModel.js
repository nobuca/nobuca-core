import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";
import NobucaContextMenuModel from "../context-menu/NobucaContextMenuModel.js";
import NobucaPositionAndSizeModel from "../size-position/NobucaPositionAndSizeModel.js";

export default class NobucaTreeModel extends NobucaPositionAndSizeModel {
    constructor() {
        super();
        this.nodes = [];
        this.selectedNode = null;
        this.createContextMenu();
        this.contextMenuItemClickEventEmitter = new NobucaUiEventEmitter();
        this.addNodeEventEmitter = new NobucaUiEventEmitter();
        this.removeNodeEventEmitter = new NobucaUiEventEmitter();
        this.childNodeAddNodeEventEmitter = new NobucaUiEventEmitter();
        this.clearNodesEventEmitter = new NobucaUiEventEmitter();
    }

    getClassName() {
        return "NobucaTreeModel";
    }

    createContextMenu() {
        this.contextMenu = new NobucaContextMenuModel();
        this.contextMenu.getMenuItemClickEventEmitter().subscribe((event) => {
            this.getContextMenuItemClickEventEmitter().emit({
                node: null,
                menuItem: event,
            });
        });
    }

    getContextMenu() {
        return this.contextMenu;
    }

    getContextMenuItemClickEventEmitter() {
        return this.contextMenuItemClickEventEmitter;
    }

    getAddNodeEventEmitter() {
        return this.addNodeEventEmitter;
    }

    getRemoveNodeEventEmitter() {
        return this.removeNodeEventEmitter;
    }

    getChildNodeAddNodeEventEmitter() {
        return this.childNodeAddNodeEventEmitter;
    }

    getClearNodesEventEmitter() {
        return this.clearNodesEventEmitter;
    }

    getNodes() {
        return this.nodes;
    }

    clearNodes() {
        this.nodes = [];
        this.getClearNodesEventEmitter().emit();
    }

    addNode(node) {
        this.nodes.push(node);

        node.getSelectEventEmitter().subscribe(() => {
            if (this.selectedNode != null && this.selectedNode != node) {
                this.selectedNode.unselect();
            }
            this.selectedNode = node;
        });
        node.getChildNodeSelectEventEmitter().subscribe((newSelectedNode) => {
            if (this.selectedNode != null && this.selectedNode != newSelectedNode) {
                this.selectedNode.unselect();
            }
            this.selectedNode = newSelectedNode;
        });

        node.getAddNodeEventEmitter().subscribe((event) => {
            this.getChildNodeAddNodeEventEmitter().emit(event);
        });

        node.getChildNodeSelectEventEmitter().subscribe((event) => {
            this.getChildNodeAddNodeEventEmitter().emit(event);
        });

        this.getAddNodeEventEmitter().emit({ parentNode: null, childNode: node });
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

    removeNodeWithData(data) {
        let node = this.findNodeByData(data);
        if (node == null) return;
        this.removeNode(node);
    }

    removeNode(node) {
        let index = this.nodes.indexOf(node);
        if (index < 0) return;
        this.nodes.splice(index, 1);
        this.getRemoveNodeEventEmitter().emit(node);
    }


}