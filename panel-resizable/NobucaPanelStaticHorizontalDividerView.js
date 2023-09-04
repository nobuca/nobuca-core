
export default class NobucaPanelStaticHorizontalDividerView {

    constructor() {
        this.nativeElement = this.createDiv();
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaPanelStaticHorizontalDivider";
        return div;
    }
    
    setSize(width, height) {
        this.nativeElement.style.width = this.getFixedWidth() + 'px';
        this.nativeElement.style.height = height + 'px';
    }

    getFixedWidth() {
        return 3;
    }

    setPosition(top, left) {
        this.nativeElement.style.top = top + 'px';
        this.nativeElement.style.left = left + 'px';
    }
}