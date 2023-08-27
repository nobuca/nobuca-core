export default class NobucaDynamicPanelVerticalDividerView {
    constructor() {
        this.nativeElement = this.createDiv();
        this.draggedEventEmiiter = new NobucaUiEventEmitter();
    }

    getDraggedEventEmitter() {
        return this.draggedEventEmiiter;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaDynamicPanelVerticalDivider";
        return div;
    }

    setSize(width, height) {
        this.nativeElement.style.width = width + "px";
        this.nativeElement.style.height = this.getFixedHeight() + "px";
    }

    getFixedHeight() {
        return 3;
    }

    setPosition(top, left) {
        this.nativeElement.style.top = top + "px";
        this.nativeElement.style.left = left + "px";
    }
}