import NobucaPositionAndSizeModel from "../size-position/NobucaPositionAndSizeModel.js";
import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";

export default class NobucaMenubarModel extends NobucaPositionAndSizeModel {
    constructor() {
        super();
        this.getSize().setFixedHeight(27);
        this.menuItemClickEventEmitter = new NobucaUiEventEmitter();
        this.menuItems = [];
        this.listenMenuItems();
    }

    getClassName() {
        return "NobucaMenubarModel";
    }

    getMenuItemClickEventEmitter() {
        return this.menuItemClickEventEmitter;
    }

    getMenuItems() {
        return this.menuItems;
    }

    addMenuItem(menuItem) {
        this.menuItems.push(menuItem);
        this.listenMenuItem(menuItem);
    }

    listenMenuItems() {
        this.menuItems.forEach(menuItem => this.listenMenuItem(menuItem));
    }

    listenMenuItem(menuItem) {
        menuItem.getClickEventEmitter().subscribe(menuItem =>
            this.getMenuItemClickEventEmitter().emit(menuItem));
    }
}