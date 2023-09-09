import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaContextMenuTitleView extends NobucaComponentView {

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaContextMenuTitle";
        div.innerHTML = this.getModel().getTitle();
        document.body.appendChild(div);
        this.setNativeElement(div);
    }

    setTitle(title) {
        this.getNativeElement().innerHTML = title;
    }

    updateViewFromModel() {
        this.setTitle(this.getModel().getTitle());
    }

}