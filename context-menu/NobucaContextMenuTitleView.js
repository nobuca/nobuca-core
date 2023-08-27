export default class NobucaContextMenuTitleView {

    constructor(contextMenuModel) {
        this.contextMenuModel = contextMenuModel;
        this.nativeElement = this.createDiv();
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaContextMenuTitle";
        div.innerHTML = this.contextMenuModel.getTitle();
        document.body.appendChild(div);
        return div;
    }

    setTitle(title) {
        this.nativeElement.innerHTML = title;
    }

    updateViewFromModel() {
        this.setTitle(this.contextMenuModel.getTitle());
    }

}