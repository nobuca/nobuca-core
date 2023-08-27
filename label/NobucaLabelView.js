export default class NobucaLabelView {

    constructor(labelModel) {
        this.labelModel = labelModel;
        this.nativeElement = this.createDiv();
        this.listenLabelModel();
    }

    getLabelModel() {
        return this.labelModel;
    }

    createDiv() {
        let label = document.createElement("div");
        label.className = "NobucaLabel";
        label.innerHTML = this.getLabelModel().getText();
        return label;
    }

    updateView() {
        this.nativeElement.innerHTML = this.getLabelModel().getText();
    }

    listenLabelModel() {
        this.getLabelModel().getTextChangedEventEmitter().subscribe(() => {
            this.updateView();
        });
    }

}