import NobucaComponentModel from "../component/NobucaComponentModel.js";
import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaTabHeaderModel from "./NobucaTabHeaderModel.js";

export default class NobucaTabsHeaderModel extends NobucaComponentModel {
    constructor() {
        super();
        this.tabs = [];
        this.currentActivatedTab = null;
        this.createTabEventEmitter = new NobucaEventEmitter();
        this.activeTabChangedEventEmitter = new NobucaEventEmitter();
        this.removeTabEventEmitter = new NobucaEventEmitter();
        this.lastActiveTabs = [];
    }

    getClassName() {
        return "NobucaTabsHeaderModel";
    }

    getTabs() {
        return this.tabs;
    }

    getCreateTabEventEmitter() {
        return this.createTabEventEmitter;
    }

    getActiveTabChangedEventEmitter() {
        return this.activeTabChangedEventEmitter;
    }

    getRemoveTabEventEmitter() {
        return this.removeTabEventEmitter;
    }

    findTabById(tabId) {
        return this.getTabs().find((tab) => tab.getId() === tabId);
    }
    
    getCurrentActivatedTab() {
        return this.currentActivatedTab;
    }

    setActiveTab(tab) {
        if (tab == this.currentActivatedTab) return;
        this.currentActivatedTab = tab;
        this.addToLastActiveTabs(tab);
        this.getActiveTabChangedEventEmitter().emit(tab);
    }

    activateTab(tabId) {
        var tab = this.findTabById(tabId);
        if (tab == null) return;
        this.setActiveTab(tab);
    }

    createTab(text, data) {
        let tab = new NobucaTabHeaderModel();
        tab.setText(text);
        tab.setData(data);
        return addTab(tab);
    }

    addTab(tab) {
        tab.setIndex(this.getTabs().length);
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