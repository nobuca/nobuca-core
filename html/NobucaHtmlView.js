export default class NobucaHtmlView {

    constructor(htmlModel) {
        this.htmlModel = htmlModel;
        this.nativeElement = this.createDiv();
        this.listenHtmlModel();
    }

    getHtmlModel() {
        return this.htmlModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaHtml";
        if (this.getHtmlModel().getHtml() != null) {
            div.innerHTML = this.getHtmlModel().getHtml();
        }
        return div;
    }

    listenHtmlModel() {
        this.getHtmlModel().getHtmlChangeEventEmitter().subscribe(() => {
            this.nativeElement.innerHTML = this.getHtmlModel().getHtml();
        });
    }
}