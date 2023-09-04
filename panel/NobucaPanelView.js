import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaPanelView extends NobucaComponentView {
    constructor(model) {
        super(model);
    }

    getClassName() {
        return "NobucaPanel";
    }

    createNativeElement() {
        let div = document.createElement("div");
        div.className = this.getClassName();
        if (this.getModel().getId() != null) {
            div.id = this.getModel().getId();
        }
        this.nativeElement = div;
        this.createChildViewsForChildModels();
    }

    createChildViewsForChildModels() {
        this.childViews = [];
        this.getModel().getChildren().forEach(childModel => {
            let childView = NobucaFactory.createNewViewForModel(childModel);
            this.addChild(childView);
        });
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

    listenModel() {
        this.getModel()
            .getAddChildEventEmitter()
            .subscribe((childModel) => {
                let childView = NobucaFactory.createNewViewForModel(childModel);
                this.addChild(childView);
            });
    }
}