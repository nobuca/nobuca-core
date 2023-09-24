import NobucaComponentModel from "../component/NobucaComponentModel.js";

export default class NobucaMenuModel extends NobucaComponentModel {
    constructor() {
        super();
        this.menuItemClickedEventEmitter = this.createEventEmitter();
        this.menuItems = [];
        this.listenMenuItems();
    }

    getClassName() {
        return "NobucaMenubarModel";
    }

    getMenuItemClickedEventEmitter() {
        return this.menuItemClickedEventEmitter;
    }

    getMenuItems() {
        return this.menuItems;
    }

    addMenuItem(menuItem) {
        this.getMenuItems().push(menuItem);
        this.listenMenuItem(menuItem);
        return menuItem;
    }

    listenMenuItems() {
        this.getMenuItems().forEach(menuItem => this.listenMenuItem(menuItem));
    }

    listenMenuItem(menuItem) {
        menuItem.getMenuItemClickedEventEmitter().subscribe(menuItem =>
            this.getMenuItemClickedEventEmitter().emit(menuItem));
    }
}