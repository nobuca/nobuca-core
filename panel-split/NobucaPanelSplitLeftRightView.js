import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaPanelSplitLeftRightView extends NobucaComponentView {
    static dragging = null;

    createNativeElement() {
        let divContainer = document.createElement("div");
        divContainer.className = "NobucaPanelSplitLeftRight";
        this.setNativeElement(divContainer);
        this.createContents();
    }

    createContents() {
        let leftPanelModel = this.getModel().getLeftPanel();
        this.leftPanelView = NobucaFactory.createNewViewForModel(leftPanelModel);
        this.leftPanelView.setParent(this);
        this.getNativeElement().appendChild(this.leftPanelView.getNativeElement());

        this.divDivider = document.createElement("div");
        this.divDivider.className = "NobucaPanelSplitLeftRightDivider";
        this.divDivider.addEventListener("mousedown", (event) => {
            this.beginDrag(event.x, event.y);
        });
        this.getNativeElement().appendChild(this.divDivider);

        let righPanelModel = this.getModel().getRightPanel();
        this.rightPanelView = NobucaFactory.createNewViewForModel(righPanelModel);
        this.rightPanelView.setParent(this);
        this.getNativeElement().appendChild(this.rightPanelView.getNativeElement());
    }

    getLeftPanelView() {
        return this.leftPanelView;
    }

    getRightPanelView() {
        return this.rightPanelView;
    }

    getDivider() {
        return this.divDivider;
    }

    beginDrag(x, y) {
        NobucaPanelSplitLeftRightView.dragging = this;
        this.getNativeElement().classList.add("dragging");
        this.beginDragX = x;
        this.beginDragY = y;
    }

    drag(x, y) {
        window.getSelection().removeAllRanges();

        var parent = this.getNativeElement().parentNode;
        var parentWidth = parent.offsetWidth;
        var dividerWidth = 3;
        var parentWidthWithoutDivider = parentWidth - dividerWidth;
        var leftPanelWidth = x;
        var rightPanelWidth = parentWidthWithoutDivider - leftPanelWidth;

        this.getLeftPanelView().getNativeElement().style.width = leftPanelWidth + "px";
        this.getLeftPanelView().updateContentsPositionAndSize();

        this.getRightPanelView().getNativeElement().style.width = rightPanelWidth + "px";
        this.getRightPanelView().updateContentsPositionAndSize();
    }

    endDrag(x, y) {
        this.getNativeElement().classList.remove("dragging");
        NobucaPanelSplitLeftRightView.dragging = null;
    }

    getLeftSideWidthPercentage() {
        let totalWidth = this.getLeftPanelWidth() + this.getRightPanelWidth();
        return this.getLeftPanelWidth() / totalWidth;
    }

    updateContentsPositionAndSize() {

        var height = this.getNativeElement().offsetHeight;
        var width = this.getNativeElement().offsetWidth;

        var dividerWidth = 3;
        var widthWithoutDivider = width - dividerWidth;
        var leftPanelWidth = Math.floor(widthWithoutDivider * this.getModel().getWeight());
        var rightPanelWidth = Math.floor(widthWithoutDivider * (1 - this.getModel().getWeight()));

        if (this.getLeftPanelView().getNativeElement().offsetHeight != height ||
            this.getLeftPanelView().getNativeElement().offsetWidth != leftPanelWidth) {
            this.getLeftPanelView().getNativeElement().style.height = height + "px";
            this.getLeftPanelView().getNativeElement().style.width = leftPanelWidth + "px";
            this.getLeftPanelView().updateContentsPositionAndSize();
        }

        this.getDivider().style.height = height + "px";
        this.getDivider().style.minWidth = dividerWidth + "px";

        var diff = widthWithoutDivider - leftPanelWidth - dividerWidth - rightPanelWidth;
        if(diff != 0) {
            rightPanelWidth -= diff;
        }

        if (this.getRightPanelView().getNativeElement().offsetHeight != height ||
            this.getRightPanelView().getNativeElement().offsetWidth != rightPanelWidth) {
            this.getRightPanelView().getNativeElement().style.height = height + "px";
            this.getRightPanelView().getNativeElement().style.width = rightPanelWidth + "px";
            this.getRightPanelView().updateContentsPositionAndSize();
        }
    }
}

window.addEventListener("mousemove", (event) => {
    if (NobucaPanelSplitLeftRightView.dragging != null) {
        NobucaPanelSplitLeftRightView.dragging.drag(event.x, event.y);
    }
});

window.addEventListener("mouseup", (event) => {
    if (NobucaPanelSplitLeftRightView.dragging != null) {
        NobucaPanelSplitLeftRightView.dragging.endDrag(event.x, event.y);
    }
});