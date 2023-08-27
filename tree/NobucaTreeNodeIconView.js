export default class NobucaTreeNodeIconView {
  constructor(nodeModel) {
    this.nodeModel = nodeModel;
    this.nativeElement = this.createDiv();
    this.createIconSrc();
    this.createIconClassName();
  }

  getNodeModel() {
    return this.nodeModel;
  }

  createDiv() {
    let div = document.createElement("div");
    div.className = "NobucaTreeNodeIcon";
    return div;
  }

  createIconSrc() {
    if (this.nodeModel.getIconSrc() == null) {
      return;
    }
    let img = document.createElement("img");
    img.className = "NobucaTreeNodeIconImg";
    img.src = this.nodeModel.getIconSrc();
    this.nativeElement.appendChild(img);
    if (this.getNodeModel().getIconColor() != null) {
      img.style.color = this.getNodeModel().getIconColor();
    }
  }

  createIconClassName() {
    if (this.nodeModel.getIconClassName() == null) {
      return;
    }
    let div = document.createElement("div");
    div.className = this.nodeModel.getIconClassName();
    this.nativeElement.appendChild(div);
    if (this.getNodeModel().getIconColor() != null) {
      div.style.color = this.getNodeModel().getIconColor();
    }
  }
}
