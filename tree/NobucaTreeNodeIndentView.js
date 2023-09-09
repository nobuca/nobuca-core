import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTreeNodeIndentView extends NobucaComponentView {

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeIndent";
        this.setNativeElement(div);
    }
}
