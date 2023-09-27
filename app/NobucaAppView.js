import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";
import NobucaDialogView from "../dialog/NobucaDialogView.js";

export default class NobucaAppView extends NobucaComponentView {

    registerCustomViewConstructors() {
    }

    registerDefaultViewConstructors() {
        NobucaFactory.registerDefaultViewConstructors();
    }
   
    registerViewConstructorForModelClassName(modelClassName, viewConstructor) {
        NobucaFactory.registerViewConstructorForModelClassName(modelClassName, viewConstructor);
    }

    getClassName() {
        return "NobucaApp";
    }

    createNativeElement() {
        var div = document.createElement("div");
        div.className = this.getClassName();
        this.setNativeElement(div);
        document.body.appendChild(this.getNativeElement());
        this.updateContentsPositionAndSize();
        window.addEventListener("resize", () => {
            this.updateContentsPositionAndSize();
        });
    }

    updateContentsPositionAndSize() {

        if (this.getNativeElement().offsetHeight == window.innerHeight &&
            this.getNativeElement().offsetWidth == window.innerWidth) return;

        this.getNativeElement().style.height = window.innerHeight + "px";
        this.getNativeElement().style.width = window.innerWidth + "px";
    }

    listenModel() {
        this.getModel().getShowDialogEventEmitter().subscribe((dialogModel) => {
            let dialogView = new NobucaDialogView(dialogModel);
        });
        this.getModel().getTitleChangedEventEmitter().subscribe(() => {
            document.title = this.getModel().getTitle();
        });
    }
}