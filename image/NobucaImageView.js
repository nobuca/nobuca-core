import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaImageView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.nativeElement = this.createImg();
    }

    createImg() {
        let img = document.createElement("img");
        img.className = "NobucaImage";
        img.src = this.getModel().getSrc();
        return img;
    }

    updateView() {
        this.nativeElement.src = this.getModel().getSrc();
    }

    listenModel() {
        this.getModel().getSrcChangedEventEmitter().subscribe(() => {
            this.updateView();
        });
    }

}