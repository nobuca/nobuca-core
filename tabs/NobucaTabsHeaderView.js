import NobucaTabHeaderView from "./NobucaTabHeaderView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaTabsHeaderView {
    constructor(tabsHeaderModel) {
        this.tabsHeaderModel = tabsHeaderModel;
        this.nativeElement = this.createDiv();
        this.divTabHeadersContainer = this.createDivTabHeadersContainer();
        this.tabHeaderViewCollection = [];
        this.updatePositionFromModel();
        this.updateSizeFromModel();
        this.tabsHeaderModel.getTabs().forEach(tabModel => {
            this.createTab(tabModel);
        });
        this.listenTabsHeaderModelEvents();
    }

    createTabs() {
        this.getTabsHeaderModel().getTabs().forEach(tabModel => {
            this.createTab(tabModel);
        });
    }

    getTabsHeaderModel() {
        return this.tabsHeaderModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTabsHeader";
        return div;
    }

    createDivTabHeadersContainer() {
        let div = document.createElement("div");
        this.nativeElement.appendChild(div);
        div.className = "NobucaTabsHeadersContainer";
        return div;
    }

    setSize(width, height) {

        this.nativeElement.style.width = width + "px";
        this.nativeElement.style.height = height + "px";

        let margin = 3;
        let border = 1;
        width = width - (margin * 2) - (border * 2);

        this.divTabHeadersContainer.style.width = width + "px";
    }

    setPosition(top, left) {
        this.nativeElement.style.top = top + "px";
        this.nativeElement.style.left = left + "px";
    }

    createDivTabHeader(text) {
        let div = document.createElement("div");
        this.nativeElement.appendChild(div);
        div.className = "NobucaTabHeader";
        div.innerHTML = text;
        return div;
    }

    createTab(tabModel) {

        let tabHeaderView = new NobucaTabHeaderView(tabModel);
        this.divTabHeadersContainer.appendChild(tabHeaderView.nativeElement);

        tabHeaderView.getClickEventEmitter().subscribe((tabModel) => {
            this.getTabsHeaderModel().setActiveTab(tabModel);
        });

        tabHeaderView.getCloseEventEmitter().subscribe((tabModel) => {
            this.getTabsHeaderModel().removeTab(tabModel);
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

    updatePositionFromModel() {
        this.setPosition(
            this.getTabsHeaderModel().getPosition().getTop(),
            this.getTabsHeaderModel().getPosition().getLeft()
        );
    }

    updateSizeFromModel() {
        this.setSize(
            this.getTabsHeaderModel().getSize().getWidth(),
            this.getTabsHeaderModel().getSize().getHeight()
        );
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

    listenTabsHeaderModelEvents() {

        this.getTabsHeaderModel()
            .getCreateTabEventEmitter()
            .subscribe((tabModel) => {
                this.createTab(tabModel);
            });

        this.getTabsHeaderModel()
            .getActiveTabChangeEventEmitter()
            .subscribe((tabModel) => {
                this.activateTab(tabModel);
            });


        this.getTabsHeaderModel()
            .getRemoveTabEventEmitter()
            .subscribe((tabModel) => {
                this.removeTab(tabModel);
            });

        this.getTabsHeaderModel()
            .getSize()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updateSizeFromModel();
            });

        this.getTabsHeaderModel()
            .getPosition()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updatePositionFromModel();
            });
    }

}