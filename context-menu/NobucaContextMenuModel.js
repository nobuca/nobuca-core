import NobucaComponentModel from '../component/NobucaComponentModel.js';
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';
import NobucaMenuItemSeparatorModel from '../menu/NobucaMenuItemSeparatorModel.js';

export default class NobucaContextMenuModel extends NobucaComponentModel {

    constructor() {
        super();
        this.title = null;
        this.menuItems = [];
        this.menuItemClickEventEmitter = new NobucaEventEmitter()
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setX(x) {
        this.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
    }

    getY() {
        return this.y;
    }

    hasMenuItems() {
        return this.menuItems.length > 0;
    }

    addMenuItem(menuItem) {
        this.menuItems.push(menuItem);
        menuItem.getClickedEventEmitter().subscribe(event => {
            this.getMenuItemClickEventEmitter().emit(event);
        });
    }

    addMenuItemSeparator() {
        let menuItemSeparator = new NobucaMenuItemSeparatorModel();
        this.menuItems.push(menuItemSeparator);
    }

    getMenuItemClickEventEmitter() {
        return this.menuItemClickEventEmitter;
    }

}