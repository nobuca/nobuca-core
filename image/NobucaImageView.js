import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaImageView extends NobucaComponentView {

    createNativeElement() {
        let img = document.createElement("img");
        img.className = "NobucaImage";
        img.src = this.getModel().getSrc();
        this.setNativeElement(img);
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