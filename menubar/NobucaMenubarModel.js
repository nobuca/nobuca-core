import NobucaPositionAndSizeModel from "../size-position/NobucaPositionAndSizeModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaMenubarModel extends NobucaPositionAndSizeModel {
    constructor() {
        super();
        this.getSize().setFixedHeight(27);
        this.menuItemClickEventEmitter = new NobucaEventEmitter();
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
        return menuItem;
    }

    listenMenuItems() {
        this.menuItems.forEach(menuItem => this.listenMenuItem(menuItem));
    }

    listenMenuItem(menuItem) {
        menuItem.getClickEventEmitter().subscribe(menuItem =>
            this.getMenuItemClickEventEmitter().emit(menuItem));
    }
}