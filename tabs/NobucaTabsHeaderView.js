import NobucaTabHeaderView from "./NobucaTabHeaderView.js";
import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTabsHeaderView extends NobucaComponentView {
    constructor(model) {
        super(model);
        this.divTabHeadersContainer = this.createDivTabHeadersContainer();
        this.tabHeaderViewCollection = [];
        this.createTabs();
    }

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTabsHeader";
        this.setNativeElement(div);
    }

    createTabs() {
        this.getModel().getTabs().forEach(tabModel => {
            this.createTab(tabModel);
        });
    }

    createDivTabHeadersContainer() {
        let div = document.createElement("div");
        this.getNativeElement().appendChild(div);
        div.className = "NobucaTabsHeadersContainer";
        return div;
    }

    createDivTabHeader(text) {
        let div = document.createElement("div");
        this.getNativeElement().appendChild(div);
        div.className = "NobucaTabHeader";
        div.innerHTML = text;
        return div;
    }

    createTab(tabModel) {

        let tabHeaderView = new NobucaTabHeaderView(tabModel);
        this.divTabHeadersContainer.appendChild(tabHeaderView.nativeElement);

        tabHeaderView.getClickEventEmitter().subscribe((tabModel) => {
            this.getModel().setActiveTab(tabModel);
        });

        tabHeaderView.getCloseEventEmitter().subscribe((tabModel) => {
            this.getModel().removeTab(tabModel);
        });

        this.getTabHeaderViewCollection().push(tabHeaderView);
        return tabHeaderView;
    }

    removeTab(tabModel) {
        let tabHeaderView = this.getTabHeaderViewByTabModel(tabModel);
        let index = this.tabHeaderViewCollection.indexOf(tabHeaderView);
        this.tabHeaderViewCollection.splice(index, 1);
        this.divTabHeadersContainer.removeChild(tabHeaderView.nativeElement);
    }

    getTabHeaderViewByTabModel(tabModel) {
        for (let i = 0; i < this.getTabHeaderViewCollection().length; i++) {
            let tabHeaderView = this.getTabHeaderViewCollection()[i];
            if (tabHeaderView.getTabModel() == tabModel) {
                return tabHeaderView;
            }
        }
        return null;
    }

    getTabHeaderViewCollection() {
        return this.tabHeaderViewCollection;
    }

    deactivateAllTabs() {
        for (let i = 0; i < this.getTabHeaderViewCollection().length; i++) {
            let tabHeaderView = this.getTabHeaderViewCollection()[i];
            tabHeaderView.deactivate();
        }
        this.activeTabHeaderView = null;
    }

    activateTab(tabModel) {
        this.deactivateAllTabs();
        let tabHeaderView = this.getTabHeaderViewByTabModel(tabModel);
        tabHeaderView.activate();
        this.activeTabHeaderView = tabHeaderView;
    }

    listenModel() {

        this.getModel()
            .getCreateTabEventEmitter()
            .subscribe((tabModel) => {
                this.createTab(tabModel);
            });

        this.getModel()
            .getActiveTabChangeEventEmitter()
            .subscribe((tabModel) => {
                this.activateTab(tabModel);
            });


        this.getModel()
            .getRemoveTabEventEmitter()
            .subscribe((tabModel) => {
                this.removeTab(tabModel);
            });
    }

}