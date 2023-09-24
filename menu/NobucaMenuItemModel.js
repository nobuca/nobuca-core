import NobucaComponentModel from "../component/NobucaComponentModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaMenuItemModel extends NobucaComponentModel {

    constructor(id, text, shortcut, iconClassName, iconImageSrc) {
        super();
        this.setId(id);
        this.text = text;
        this.shortcut = shortcut;
        this.disabled = false;
        this.iconClassName = iconClassName;
        this.iconImageSrc = iconImageSrc;
        this.menuItems = [];
        this.menuItemClickedEventEmitter = this.createEventEmitter();
    }

    getText() {
        return this.text;
    }

    getShortcut() {
        return this.shortcut;
    }

    setShortcut(shortcut) {
        this.shortcut = shortcut;
    }

    getDisabled() {
        return this.disabled;
    }

    setDisabled(disabled) {
        this.disabled = disabled;
    }

    getIconClassName() {
        return this.iconClassName;
    }

    getIconImageSrc() {
        return this.iconImageSrc;
    }

    setIconImageSrc(iconImageSrc) {
        this.iconImageSrc = iconImageSrc;
    }

    getMenuItems() {
        return this.menuItems;
    }

    getMenuItemClickedEventEmitter() {
        return this.menuItemClickedEventEmitter;
    }

    getSeparator() {
        return false;
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