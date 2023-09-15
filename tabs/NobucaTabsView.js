import NobucaTabHeaderView from "./NobucaTabHeaderView.js";
import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTabsView extends NobucaComponentView {
    constructor(model) {
        super(mode);
        this.divTabHeadersContainer = this.createDivTabHeadersContainer();
        this.divTabBodiesContainer = this.createDivTabBodiesContainer();
        this.tabHeaderViewCollection = [];
        this.updateContentsPositionAndSize();
        this.updateSizeFromModel();
    }

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTabs";
        this.setNativeElement(div);
    }

    createDivTabHeadersContainer() {
        let div = document.createElement("div");
        this.getNativeElement().appendChild(div);
        div.className = "NobucaTabsHeadersContainer";
        return div;
    }

    createDivTabBodiesContainer() {
        let div = document.createElement("div");
        this.getNativeElement().appendChild(div);
        div.className = "NobucaTabsBodiesContainer";
        return div;
    }

    setSize(width, height) {

        this.getNativeElement().style.width = width + "px";
        this.getNativeElement().style.height = height + "px";

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
        this.getNativeElement().style.top = top + "px";
        this.getNativeElement().style.left = left + "px";
    }

    createDivTabHeader(text) {
        let div = document.createElement("div");
        this.getNativeElement().appendChild(div);
        div.className = "NobucaTabHeader";
        div.innerHTML = text;
        return div;
    }

    createTab(tabModel) {

        let tabBodyView = this.createTabBodyView(tabModel);
        let tabHeaderView = new NobucaTabHeaderView(tabModel, tabBodyView);
        this.divTabHeadersContainer.appendChild(tabHeaderView.getNativeElement());
        this.divTabBodiesContainer.appendChild(tabBodyView.getNativeElement());

        tabHeaderView.getClickedEventEmitter().subscribe((tabModel) => {
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
        this.divTabHeadersContainer.removeChild(tabHeaderView.getNativeElement());
        this.divTabBodiesContainer.removeChild(tabHeaderView.getBodyView().nativeElement);
    }

    getTabHeaderViewByTabModel(tabModel) {
        for (let i = 0; i < this.getTabHeaderViewCollection().length; i++) {
            let tabHeaderView = this.getTabHeaderViewCollection()[i];
            if (tabHeaderView.getModel() == tabModel) {
                return tabHeaderView;
            }
        }
        return null;
    }

    createTabBodyView(tabModel) {
        return this.createNewViewForModel(tabModel.getBody());
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