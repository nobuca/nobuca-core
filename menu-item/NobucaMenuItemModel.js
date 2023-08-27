import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";

export default class NobucaMenuItemModel {

    constructor(id, text, shortcut, iconClassName, iconImageSrc) {
        this.id = id;
        this.text = text;
        this.shortcut = shortcut;
        this.iconClassName = iconClassName;
        this.iconImageSrc = iconImageSrc;
        this.menuItems = [];
        this.clickEventEmitter = new NobucaUiEventEmitter();
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }

    getShortcut() {
        return this.shortcut;
    }

    getIconClassName() {
        return this.iconClassName;
    }

    getIconImageSrc() {
        return this.iconImageSrc;
    }

    addMenuItem(menuItemModel) {
        this.menuItems.push(menuItemModel);
    }

    getClickEventEmitter() {
        return this.clickEventEmitter;
    }

    getSeparator() {
        return false;
    }
}