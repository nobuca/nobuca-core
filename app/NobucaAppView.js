import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";
import NobucaPanelView from "../panel/NobucaPanelView.js";
import NobucaDialogView from "../dialog/NobucaDialogView.js";

export default class NobucaAppView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createRootPanelView();
    }

    registerViewConstructors() {
        NobucaFactory.registerDefaultViewConstructors();
    }

    createRootPanelView() {
        this.rootPanelView = new NobucaPanelView(this.getModel().getRootPanel());
        this.addRootPanelViewToDocumentBody(this.rootPanelView);
        this.updateContentsPositionAndSize();

        window.addEventListener("resize", () => {
            this.updateContentsPositionAndSize();
        });
    }

    getRootPanelView() {
        return this.rootPanelView;
    }

    addRootPanelViewToDocumentBody(rootPanelView) {
        document.body.appendChild(rootPanelView.getNativeElement());
    }

    updateContentsPositionAndSize() {

        this.getRootPanelView().getNativeElement().style.height = window.innerHeight + "px";
        this.getRootPanelView().getNativeElement().style.width = window.innerWidth + "px";

        this.getRootPanelView().updateContentsPositionAndSize();
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