import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaPanelView {
    constructor(panelModel) {
        this.panelModel = panelModel;
        this.nativeElement = this.createDiv();
        this.childViews = [];
        this.listenPanelModelEvents();
        this.createNewViewsForChildModels();
    }

    createNewViewsForChildModels() {
        this.getPanelModel().getChildren().forEach(childModel => {
            let childView = NobucaFactory.createNewViewForModel(childModel);
            this.addChild(childView);
        });
    }

    getPanelModel() {
        return this.panelModel;
    }

    getNativeElement() {
        return this.nativeElement;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaPanel";
        if (this.getPanelModel().getId() != null) {
            div.id = this.getPanelModel().getId();
        }
        return div;
    }

    makeRootPanel() {
        this.rootPanel = true;
    }

    addChild(childView) {
        this.nativeElement.appendChild(childView.nativeElement);
        this.childViews.push(childView);
        childView.parentView = this;
    }

    removeChild(childView) {
        let index = this.childViews.indexOf(childView);
        this.nativeElement.removeChild(childView.nativeElement);
        this.childViews.splice(index, 1);
    }

    removeChilds() {
        while (this.childViews.length > 0) {
            this.removeChild(this.childViews[0]);
        }
    }

    getChildIndex(childView) {
        return this.childViews.indexOf(childView);
    }

    getChildAtIndex(index) {
        return this.childViews[index];
    }

    listenPanelModelEvents() {
        this.getPanelModel()
            .getAddChildEventEmitter()
            .subscribe((childModel) => {
                let childView = NobucaFactory.createNewViewForModel(childModel);
                this.addChild(childView);
            });
    }
}