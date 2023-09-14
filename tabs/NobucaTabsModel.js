import NobucaPositionAndSizeModel from "../size-position/NobucaPositionAndSizeModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaTabModel from "./NobucaTabModel.js";

export default class NobucaTabsModel extends NobucaComponentModel {
    constructor() {
        super();
        this.tabs = [];
        this.currentActivatedTab = null;
        this.createTabEventEmitter = new NobucaEventEmitter();
        this.activeTabChangeEventEmitter = new NobucaEventEmitter();
        this.removeTabEventEmitter = new NobucaEventEmitter();
        this.lastActiveTabs = [];
    }

    getClassName() {
        return "NobucaTabsModel";
    }

    getTabs() {
        return this.tabs;
    }

    getCreateTabEventEmitter() {
        return this.createTabEventEmitter;
    }

    getActiveTabChangeEventEmitter() {
        return this.activeTabChangeEventEmitter;
    }

    getRemoveTabEventEmitter() {
        return this.removeTabEventEmitter;
    }

    getCurrentActivatedTab() {
        return this.currentActivatedTab;
    }

    setActiveTab(tab) {
        if (tab == this.currentActivatedTab) return;
        this.currentActivatedTab = tab;
        this.addToLastActiveTabs(tab);
        this.getActiveTabChangeEventEmitter().emit(tab);
    }

    createTab(text, body, data) {
        let tab = new NobucaTabModel();
        tab.setText(text);
        tab.setBody(body);
        tab.setData(data);
        this.getTabs().push(tab);
        this.getCreateTabEventEmitter().emit(tab);
        if (this.currentActivatedTab == null) {
            this.setActiveTab(tab);
        }
        return tab;
    }

    removeTab(tab) {
        let index = this.tabs.indexOf(tab);
        this.tabs.splice(index, 1);
        this.removeFromLastActiveTabs(tab);
        this.getRemoveTabEventEmitter().emit(tab);
        if (tab != this.currentActivatedTab) return;
        this.currentActivatedTab = null;
        let lastActiveTab = this.getLastActiveTab();
        if (lastActiveTab == null) return;
        this.setActiveTab(lastActiveTab);
    }

    removeTabWithData(data) {
        let tab = this.getTabs().find(t => t.getData() == data);
        if (tab == null) return;
        this.removeTab(tab);
    }

    removeFromLastActiveTabs(tab) {
        let index = this.lastActiveTabs.indexOf(tab);
        if (index >= 0) {
            this.lastActiveTabs.splice(index, 1);
        }
    }

    addToLastActiveTabs(tab) {
        this.removeFromLastActiveTabs(tab);
        this.lastActiveTabs.push(tab);
    }

    getLastActiveTab() {
        if (this.lastActiveTabs.length == 0) return null;
        return this.lastActiveTabs[this.lastActiveTabs.length - 1];
    }
}