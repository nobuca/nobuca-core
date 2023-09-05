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

        var parent = this.getNativeElement().parentNode;
        var parentHeight = parent.offsetHeight;
        var parentWidth = parent.offsetWidth;
        this.getNativeElement().style.height = parentHeight + "px";
        this.getNativeElement().style.width = parentWidth + "px";

        var dividerWidth = 3;
        var parentWithWithoutDivider = parentWidth - dividerWidth;
        var leftPanelWidth = parentWithWithoutDivider * this.getModel().getWeight();
        var rightPanelWidth = parentWithWithoutDivider * (1 - this.getModel().getWeight());

        this.getLeftPanelView().getNativeElement().style.height = parentHeight + "px";
        this.getLeftPanelView().getNativeElement().style.width = leftPanelWidth + "px";
        this.getLeftPanelView().updateContentsPositionAndSize();

        this.getDivider().style.height = parentHeight + "px";
        this.getDivider().style.width = dividerWidth + "px";

        this.getRightPanelView().getNativeElement().style.height = parentHeight + "px";
        this.getRightPanelView().getNativeElement().style.width = rightPanelWidth + "px";
        this.getRightPanelView().updateContentsPositionAndSize();
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
    if (NobucaPanelSplitLeftRightView.dragging != null) {
        NobucaPanelSplitLeftRightView.dragging.drag(event.x, event.y);
    }
});

window.addEventListener("mouseup", (event) => {
    if (NobucaPanelSplitLeftRightView.dragging != null) {
        NobucaPanelSplitLeftRightView.dragging.endDrag(event.x, event.y);
    }
});