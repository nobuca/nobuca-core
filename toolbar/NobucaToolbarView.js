export default class NobucaToolbarView {

    constructor() {
        this.nativeElement = this.createDiv();
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaToolbarView";
        return div;
    }


}
