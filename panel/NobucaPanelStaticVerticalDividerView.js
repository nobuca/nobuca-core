export default class NobucaPanelStaticVerticalDividerView {
  constructor() {
    this.nativeElement = this.createDiv();
  }

  createDiv() {
    let div = document.createElement("div");
    div.className = "NobucaPanelStaticVerticalDivider";
    return div;
  }

  setSize(width, height) {
    this.nativeElement.style.width = width + "px";
    this.nativeElement.style.height = this.getFixedHeight() + "px";
  }

  hasFixedHeight() {
    return true;
  }

  getFixedHeight() {
    return 3;
  }

  setPosition(top, left) {
    this.nativeElement.style.top = top + "px";
    this.nativeElement.style.left = left + "px";
  }
}
