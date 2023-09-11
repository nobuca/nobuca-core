import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaLabelView extends NobucaComponentView {

    createNativeElement() {
        let label = document.createElement("div");
        label.className = "NobucaLabel";
        label.innerHTML = this.getModel().getText();
        this.setNativeElement(label);
    }

    updateView() {
        this.nativeElement.innerHTML = this.getModel().getText();
    }

    listenModel() {
        this.getModel().getTextChangedEventEmitter().subscribe(() => {
            this.updateView();
        });
    }

}