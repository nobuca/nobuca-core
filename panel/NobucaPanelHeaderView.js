export default class NobucaPanelHeaderView {
  constructor() {
    this.nativeElement = this.createDiv();
  }

  createDiv() {
    let div = document.createElement("div");
    div.className = "NobucaPanelHeader";
    div.appendChild(this.createTitle());
    return div;
  }

  createTitle() {
    let div = document.createElement("div");
    div.className = "NobucaPanelHeaderTile";
    this.divTitle = div;
    return div;
  }

  setTitle(title) {
    this.divTitle.innerHTML = title;
  }
}
