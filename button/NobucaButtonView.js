import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaButtonView extends NobucaComponentView {
    
    getClassName() {
        return "NobucaButtton";
    }

    createNativeElement() {
        let div = document.createElement("div");
        div.className = this.getClassName();
        div.innerHTML = this.getModel().getText();
        div.tabIndex = 0;
        this.nativeElement = div;
        this.listenNativeElement();
        this.updateView();
    }

    listenNativeElement() {
        this.getNativeElement().addEventListener("click", (event) => {
            this.emitClickEvent();
        });
        this.getNativeElement().addEventListener("keypress", (event) => {
            console.log("keypress", event)
            if (event.code == "Space" || event.code == "Enter" || event.code == "NumpadEnter") {
                this.emitClickEvent();
            }
        });
    }

    emitClickEvent() {
        if (this.getModel().getEnabled()) {
            this.getModel()
                .getClickedEventEmitter()
                .emit();
        }
    }

    updateView() {
        if (this.getModel().getEnabled()) {
            this.nativeElement.classList.remove("disabled");
            this.nativeElement.classList.add("enabled");
        } else {
            this.nativeElement.classList.add("disabled");
            this.nativeElement.classList.remove("enabled");
        }
    }

    listenModel() {
        this.getModel().getEnabledChangedEventEmitter().subscribe(() => {
            this.updateView();
        });
        this.getModel().getRequestFocusEventEmitter().subscribe(() => {
            this.nativeElement.focus();
        });
    }
}