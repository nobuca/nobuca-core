import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaPanelSplitTopBottomView extends NobucaComponentView {
    static dragging = null;

    createNativeElement() {
        let divContainer = document.createElement("div");
        divContainer.className = "NobucaPanelSplitTopBottom";
        this.setNativeElement(divContainer);
        this.createContents();
    }

    createContents() {
        let topPanelModel = this.getModel().getTopPanel();
        this.topPanelView = this.createNewViewForModel(topPanelModel);
        this.topPanelView.setParent(this);
        this.getNativeElement().appendChild(this.topPanelView.getNativeElement());

        this.divDivider = document.createElement("div");
        this.divDivider.className = "NobucaPanelSplitTopBottomDivider";
        this.divDivider.addEventListener("mousedown", (event) => {
            this.beginDrag(event.x, event.y);
        });
        this.getNativeElement().appendChild(this.divDivider);

        let bottomPanelModel = this.getModel().getBottomPanel();
        this.bottomPanelView = this.createNewViewForModel(bottomPanelModel);
        this.bottomPanelView.setParent(this);
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
        this.offsetY = y - this.getTopPanelView().getNativeElement().offsetHeight;
    }

    drag(x, y) {
        window.getSelection().removeAllRanges();

        var parent = this.getNativeElement().parentNode;
        var parentHeight = parent.offsetHeight;
        var parentWidth = parent.offsetWidth;
        var dividerHeight = 3;
        var parentHeightWithoutDivider = parentHeight - dividerHeight;
        var topPanelHeight = this.getTopPanelView().getNativeElement().offsetHeight;
        topPanelHeight = y - this.offsetY;
        var bottomPanelHeight = parentHeightWithoutDivider - topPanelHeight;

        this.getTopPanelView().getNativeElement().style.height = topPanelHeight + "px";
        this.getTopPanelView().getNativeElement().style.width = parentWidth + "px";
        this.getTopPanelView().updateContentsPositionAndSize();

        this.getDivider().style.width = parentWidth + "px";

        this.getBottomPanelView().getNativeElement().style.height = bottomPanelHeight + "px";
        this.getBottomPanelView().getNativeElement().style.width = parentWidth + "px";
        this.getBottomPanelView().updateContentsPositionAndSize();

        var newWeight = topPanelHeight / parentHeightWithoutDivider;
        this.getModel().setWeight(newWeight);
    }

    endDrag(x, y) {
        this.getNativeElement().classList.remove("dragging");
        NobucaPanelSplitTopBottomView.dragging = null;
    }

    getLeftSideWidthPercentage() {
        let totalWidth = this.getTopPanelWidth() + this.getBottomPanelWidth();
        return this.getTopPanelWidth() / totalWidth;
    }

    updateContentsPositionAndSize() {

        var parent = this.getNativeElement().parentNode;
        var parentHeight = parent.offsetHeight;
        var parentWidth = parent.offsetWidth;
        this.getNativeElement().style.height = parentHeight + "px";
        this.getNativeElement().style.width = parentWidth + "px";

        var dividerHeight = 3;
        var parentHeightWithoutDivider = parentHeight - dividerHeight;
        var topPanelHeight = parentHeightWithoutDivider * this.getModel().getWeight();
        var bottomPanelHeight = parentHeightWithoutDivider * (1 - this.getModel().getWeight());

        this.getTopPanelView().getNativeElement().style.height = topPanelHeight + "px";
        this.getTopPanelView().getNativeElement().style.width = parentWidth + "px";
        this.getTopPanelView().updateContentsPositionAndSize();

        this.getDivider().style.height = dividerHeight + "px";
        this.getDivider().style.width = parentWidth + "px";

        this.getBottomPanelView().getNativeElement().style.height = bottomPanelHeight + "px";
        this.getBottomPanelView().getNativeElement().style.width = parentWidth + "px";
        this.getBottomPanelView().updateContentsPositionAndSize();
    }

    setSize(width, height) {
        this.getNativeElement().style.width =
            this.getModel().getSize().getFixedWidth() + "px";
        this.nativeElement.style.height = height + "px";
    }

    setPosition(top, left) {
        this.getNativeElement().style.top = top + "px";
        this.getNativeElement().style.left = left + "px";
    }
}

window.addEventListener("mousemove", (event) => {
    if (NobucaPanelSplitTopBottomView.dragging != null) {
        NobucaPanelSplitTopBottomView.dragging.drag(event.x, event.y);
    }
});

window.addEventListener("mouseup", (event) => {
    if (NobucaPanelSplitTopBottomView.dragging != null) {
        NobucaPanelSplitTopBottomView.dragging.endDrag(event.x, event.y);
    }
});