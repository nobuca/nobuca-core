import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaPanelSplitTopBottomView extends NobucaComponentView {

    static dragging = null;

    createNativeElement() {
        let divContainer = document.createElement("div");
        divContainer.className = "NobucaPanelSplitTopBottom";
        this.setNativeElement(divContainer);
        this.createContents();
        this.composeContents();
    }

    createContents() {
        let topPanelModel = this.getModel().getTopPanel();
        this.topPanelView = NobucaFactory.createNewViewForModel(topPanelModel);
        this.topPanelView.setParent(this);

        this.divDivider = document.createElement("div");
        this.divDivider.className = "NobucaPanelSplitTopBottomDivider";
        this.divDivider.addEventListener("mousedown", (event) => {
            this.beginDrag(event.x, event.y);
        });

        let bottomPanelModel = this.getModel().getBottomPanel();
        this.bottomPanelView = NobucaFactory.createNewViewForModel(bottomPanelModel);
        this.bottomPanelView.setParent(this);
    }

    composeContents() {
        this.getNativeElement().appendChild(this.topPanelView.getNativeElement());
        this.getNativeElement().appendChild(this.divDivider);
        this.getNativeElement().appendChild(this.bottomPanelView.getNativeElement());
    }

    getTopPanelView() {
        return this.topPanelView;
    }

    getBottomPanelView() {
        return this.bottomPanelView;
    }

    getDivider() {
        return this.divDivider;
    }

    beginDrag(x, y) {
        NobucaPanelSplitTopBottomView.dragging = this;
        this.getNativeElement().classList.add("dragging");
    }

    drag(movementY) {
        
        window.getSelection().removeAllRanges();

        var parent = this.getNativeElement().parentNode;
        var parentHeight = parent.offsetHeight;
        var dividerHeight = 3;
        var parentHeightWithoutDivider = parentHeight - dividerHeight;
        var topPanelHeight = this.getTopPanelView().getNativeElement().offsetHeight + movementY;
        var bottomPanelHeight = parentHeightWithoutDivider - topPanelHeight;

        this.getTopPanelView().getNativeElement().style.height = topPanelHeight + "px";
        this.getTopPanelView().updateContentsPositionAndSize();

        this.getBottomPanelView().getNativeElement().style.height = bottomPanelHeight + "px";
        this.getBottomPanelView().updateContentsPositionAndSize();

        var newWeight = topPanelHeight / parentHeightWithoutDivider;
        this.getModel().setWeight(newWeight);
    }

    endDrag(x, y) {
        this.getNativeElement().classList.remove("dragging");
        NobucaPanelSplitTopBottomView.dragging = null;
    }

    getTopSideWidthPercentage() {
        let totalWidth = this.getTopPanelWidth() + this.getBottomPanelWidth();
        return this.getTopPanelWidth() / totalWidth;
    }

    updateContentsPositionAndSize() {

        var height = this.getNativeElement().offsetHeight;
        var width = this.getNativeElement().offsetWidth;

        var dividerHeight = 3;

        var heightWithoutDivider = height - dividerHeight;
        var topPanelHeight = Math.floor(heightWithoutDivider * this.getModel().getWeight());
        var bottomPanelHeight = Math.floor(heightWithoutDivider * (1 - this.getModel().getWeight()));

        var diff = height
            - dividerHeight
            - (heightWithoutDivider * this.getModel().getWeight())
            - (heightWithoutDivider * (1 - this.getModel().getWeight()));
        if (diff < 0) {
            bottomPanelHeight += Math.floor(diff);
        } else if (diff > 0) {
            bottomPanelHeight += Math.ceil(diff);
        }

        this.getTopPanelView().getNativeElement().style.display = "";
        this.getBottomPanelView().getNativeElement().style.display = "";
        this.getDivider().style.display = "";

        this.getTopPanelView().getNativeElement().style.height = topPanelHeight + "px";
        this.getTopPanelView().getNativeElement().style.width = width + "px";
        this.getTopPanelView().updateContentsPositionAndSize();

        this.getDivider().style.height = dividerHeight + "px";
        this.getDivider().style.width = width + "px";

        this.getBottomPanelView().getNativeElement().style.height = bottomPanelHeight + "px";
        this.getBottomPanelView().getNativeElement().style.width = width + "px";
        this.getBottomPanelView().updateContentsPositionAndSize();
    }
}

window.addEventListener("mousemove", (event) => {
    if (NobucaPanelSplitTopBottomView.dragging != null) {
        NobucaPanelSplitTopBottomView.dragging.drag(event.movementY);
    }
});

window.addEventListener("mouseup", (event) => {
    if (NobucaPanelSplitTopBottomView.dragging != null) {
        NobucaPanelSplitTopBottomView.dragging.endDrag();
    }
});