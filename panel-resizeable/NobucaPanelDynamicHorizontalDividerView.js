import NobucaHtmlClassName from "../utils/NobucaHtmlClassName.js";

export default class NobucaPanelDynamicHorizontalDividerView {
    static dragging = null;

    constructor(dividerModel) {
        this.dividerModel = dividerModel;
        this.nativeElement = this.createDiv();
        this.listenDividerModelEvents();
    }

    getDividerModel() {
        return this.dividerModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaPanelDynamicHorizontalDivider";

        div.addEventListener("mousedown", (event) => {
            this.beginDrag(event.x, event.y);
        });

        return div;
    }

    beginDrag(x, y) {
        NobucaPanelDynamicHorizontalDividerView.dragging = this;
        NobucaHtmlClassName.addClassName(this.nativeElement, "dragging");
        this.getDividerModel().beginDrag(x, y);
    }

    drag(x, y) {
        window.getSelection().removeAllRanges();
        this.getDividerModel().drag(x, y);
    }

    endDrag(x, y) {
        this.getDividerModel().getDraggedEventEmitter().emit(this);
        NobucaHtmlClassName.removeClassName(this.nativeElement, "dragging");
        NobucaPanelDynamicHorizontalDividerView.dragging = null;
    }

    getLeftSideWidthPercentage() {
        let totalWidth = this.getLeftPanelWidth() + this.getRightPanelWidth();
        return this.getLeftPanelWidth() / totalWidth;
    }

    setSize(width, height) {
        this.nativeElement.style.width =
            this.getDividerModel().getSize().getFixedWidth() + "px";
        this.nativeElement.style.height = height + "px";
    }

    setPosition(top, left) {
        this.nativeElement.style.top = top + "px";
        this.nativeElement.style.left = left + "px";
    }

    updatePositionFromModel() {
        this.setPosition(
            this.getDividerModel().getPosition().getTop(),
            this.getDividerModel().getPosition().getLeft()
        );
    }

    updateSizeFromModel() {
        this.setSize(
            this.getDividerModel().getSize().getWidth(),
            this.getDividerModel().getSize().getHeight()
        );
    }

    listenDividerModelEvents() {
        this.getDividerModel()
            .getSize()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updateSizeFromModel();
            });

        this.getDividerModel()
            .getPosition()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updatePositionFromModel();
            });
    }
}

window.addEventListener("mousemove", (event) => {
    if (NobucaPanelDynamicHorizontalDividerView.dragging != null) {
        NobucaPanelDynamicHorizontalDividerView.dragging.drag(event.x, event.y);
    }
});

window.addEventListener("mouseup", (event) => {
    if (NobucaPanelDynamicHorizontalDividerView.dragging != null) {
        NobucaPanelDynamicHorizontalDividerView.dragging.endDrag(event.x, event.y);
    }
});