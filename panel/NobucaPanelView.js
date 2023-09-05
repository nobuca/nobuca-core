import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaPanelView extends NobucaComponentView {
 
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

    getChildViews() {
        return this.childViews;
    }

    addChild(childView) {
        this.getNativeElement().appendChild(childView.nativeElement);
        this.getChildViews().push(childView);
        childView.setParent(this);
        childView.updateContentsPositionAndSize();
    }

    removeChild(childView) {
        let index = this.getChildViews().indexOf(childView);
        this.getNativeElement().removeChild(childView.getNativeElement());
        this.getChildViews().splice(index, 1);
    }

    removeChilds() {
        while (this.getChildViews().length > 0) {
            this.removeChild(this.getChildViews()[0]);
        }
    }

    getChildIndex(childView) {
        return this.getChildViews().indexOf(childView);
    }

    getChildAtIndex(index) {
        return this.getChildViews()[index];
    }

    updateContentsPositionAndSize() {
        this.getChildViews().forEach(childView => childView.updateContentsPositionAndSize());
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