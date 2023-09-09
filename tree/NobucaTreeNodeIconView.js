import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTreeNodeIconView extends NobucaComponentView {

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeIcon";
        this.setNativeElement(div);
        this.createIconImg();
    }

    createIconImg() {
        if (this.getModel().getSrc() == null) return;
        let img = document.createElement("img");
        img.className = "NobucaTreeNodeIconImg";
        img.src = this.getModel().getSrc();
        this.getNativeElement().appendChild(img);
    }
}