import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";
import NobucaDialogView from "../dialog/NobucaDialogView.js";
import NobucaDialogModel from "../dialog/NobucaDialogModel.js";

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
        if (NobucaDialogModel.getActiveDialog() != null) {
            if (this.getActiveDialogView() == null) {
                this.setActiveDialogView(new NobucaDialogView(NobucaDialogModel.getActiveDialog()));
            }
        }
    }

    setActiveDialogView(activeDialogView) {
        this.activeDialogView = activeDialogView;
    }

    getActiveDialogView() {
        return this.activeDialogView;
    }

    updateContentsPositionAndSize() {

        if (this.getNativeElement().offsetHeight == window.innerHeight &&
            this.getNativeElement().offsetWidth == window.innerWidth) return;

        this.getNativeElement().style.height = window.innerHeight + "px";
        this.getNativeElement().style.width = window.innerWidth + "px";

        if (this.getActiveDialogView() != null) {
            this.getActiveDialogView().updateContentsPositionAndSize();
        }
    }

    listenModel() {
        NobucaDialogModel.getShowDialogEventEmitter().subscribe((dialogModel) => {
            this.setActiveDialogView(new NobucaDialogView(dialogModel));
        });
        this.getModel().getTitleChangedEventEmitter().subscribe(() => {
            document.title = this.getModel().getTitle();
        });
    }
}