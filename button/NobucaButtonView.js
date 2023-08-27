export default class NobucaButtonView {
    
    constructor(buttonModel) {
        this.buttonModel = buttonModel;
        this.nativeElement = this.createDiv();
        this.updateView();
        this.listenButtonModel();
    }

    getButtonModel() {
        return this.buttonModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaButton";
        div.innerHTML = this.getButtonModel().getText();
        div.tabIndex = 0;
        div.addEventListener("click", (event) => {
            this.emitClickEvent();
        });
        div.addEventListener("keypress", (event) => {
            console.log("keypress", event)
            if (event.code == "Space" || event.code == "Enter" || event.code == "NumpadEnter") {
                this.emitClickEvent();
            }
        });
        return div;
    }

    emitClickEvent() {
        if (this.getButtonModel().getEnabled()) {
            this.getButtonModel()
                .getClickEventEmitter()
                .emit();
        }
    }

    updateView() {
        if (this.getButtonModel().getEnabled()) {
            this.nativeElement.classList.remove("disabled");
            this.nativeElement.classList.add("enabled");
        } else {
            this.nativeElement.classList.add("disabled");
            this.nativeElement.classList.remove("enabled");
        }
    }

    listenButtonModel() {
        this.getButtonModel().getEnabledChangedEventEmitter().subscribe(() => {
            this.updateView();
        });
        this.getButtonModel().getRequestFocusEventEmitter().subscribe(() => {
            this.nativeElement.focus();
        });
    }
}