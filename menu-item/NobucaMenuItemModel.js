import NobucaComponentModel from "../component/NobucaComponentModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";

export default class NobucaMenuItemModel extends NobucaComponentModel {

    constructor(id, text, shortcut, iconClassName, iconImageSrc) {
        super();
        this.setId(id);
        this.text = text;
        this.shortcut = shortcut;
        this.iconClassName = iconClassName;
        this.iconImageSrc = iconImageSrc;
        this.menuItems = [];
        this.clickEventEmitter = new NobucaEventEmitter();
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

    setIconImageSrc(iconImageSrc) {
        this.iconImageSrc = iconImageSrc;
    }

    addMenuItem(menuItemModel) {
        this.menuItems.push(menuItemModel);
        return menuItemModel;
    }

    getClickEventEmitter() {
        return this.clickEventEmitter;
    }

    getSeparator() {
        return false;
    }
}