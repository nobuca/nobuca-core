import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaLabelView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.nativeElement = this.createDiv();
    }

    createDiv() {
        let label = document.createElement("div");
        label.className = "NobucaLabel";
        label.innerHTML = this.getModel().getText();
        return label;
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