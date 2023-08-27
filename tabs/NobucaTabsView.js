import NobucaTabHeaderView from "./NobucaTabHeaderView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaTabsView {
    constructor(tabsModel) {
        this.tabsModel = tabsModel;
        this.nativeElement = this.createDiv();
        this.divTabHeadersContainer = this.createDivTabHeadersContainer();
        this.divTabBodiesContainer = this.createDivTabBodiesContainer();
        this.tabHeaderViewCollection = [];
        this.updatePositionFromModel();
        this.updateSizeFromModel();
        this.listenTabsModelEvents();
    }

    getTabsModel() {
        return this.tabsModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaTabs";
        return div;
    }

    createDivTabHeadersContainer() {
        let div = document.createElement("div");
        this.nativeElement.appendChild(div);
        div.className = "NobucaTabsHeadersContainer";
        return div;
    }

    createDivTabBodiesContainer() {
        let div = document.createElement("div");
        this.nativeElement.appendChild(div);
        div.className = "NobucaTabsBodiesContainer";
        return div;
    }

    setSize(width, height) {

        this.nativeElement.style.width = width + "px";
        this.nativeElement.style.height = height + "px";

        let margin = 3;
        let border = 1;
        width = width - (margin * 2) - (border * 2);

        this.divTabHeadersContainer.style.width = width + "px";
        let headersHeight = this.divTabHeadersContainer.offsetHeight;

        let divTabBodiesContainerHeight = height - headersHeight;

        height = divTabBodiesContainerHeight - (margin * 2) - (border * 2);

        this.divTabBodiesContainer.style.width = width + "px";
        this.divTabBodiesContainer.style.height = height + "px";

        if (
            this.activeTabHeaderView != null &&
            this.activeTabHeaderView.getBodyView().setSize != null
        ) {
            this.activeTabHeaderView
                .getBodyView()
                .setSize(width, height);
        }
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

        let tabBodyView = this.createTabBodyView(tabModel);
        let tabHeaderView = new NobucaTabHeaderView(tabModel, tabBodyView);
        this.divTabHeadersContainer.appendChild(tabHeaderView.nativeElement);
        this.divTabBodiesContainer.appendChild(tabBodyView.nativeElement);

        tabHeaderView.getClickEventEmitter().subscribe((tabModel) => {
            this.getTabsModel().setActiveTab(tabModel);
        });

        tabHeaderView.getCloseEventEmitter().subscribe((tabModel) => {
            this.getTabsModel().removeTab(tabModel);
        });

        this.getTabHeaderViewCollection().push(tabHeaderView);
        return tabHeaderView;
    }

    removeTab(tabModel) {
        let tabHeaderView = this.getTabHeaderViewByTabModel(tabModel);
        let index = this.tabHeaderViewCollection.indexOf(tabHeaderView);
        this.tabHeaderViewCollection.splice(index, 1);
        this.divTabHeadersContainer.removeChild(tabHeaderView.nativeElement);
        this.divTabBodiesContainer.removeChild(tabHeaderView.getBodyView().nativeElement);
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

    createTabBodyView(tabModel) {
        return NobucaFactory.createNewViewForModel(tabModel.getBody());
    }

    getTabHeaderViewCollection() {
        return this.tabHeaderViewCollection;
    }

    updatePositionFromModel() {
        this.setPosition(
            this.getTabsModel().getPosition().getTop(),
            this.getTabsModel().getPosition().getLeft()
        );
    }

    updateSizeFromModel() {
        this.setSize(
            this.getTabsModel().getSize().getWidth(),
            this.getTabsModel().getSize().getHeight()
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

    listenTabsModelEvents() {

        this.getTabsModel()
            .getCreateTabEventEmitter()
            .subscribe((tabModel) => {
                this.createTab(tabModel);
            });

        this.getTabsModel()
            .getActiveTabChangeEventEmitter()
            .subscribe((tabModel) => {
                this.activateTab(tabModel);
            });


        this.getTabsModel()
            .getRemoveTabEventEmitter()
            .subscribe((tabModel) => {
                this.removeTab(tabModel);
            });

        this.getTabsModel()
            .getSize()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updateSizeFromModel();
            });

        this.getTabsModel()
            .getPosition()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updatePositionFromModel();
            });
    }

}