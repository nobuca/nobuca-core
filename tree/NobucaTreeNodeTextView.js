import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTreeNodeTextView extends NobucaComponentView {

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeText";
        this.setNativeElement(div);
        this.getNativeElement().innerHTML = this.getModel().getText();
    }
}