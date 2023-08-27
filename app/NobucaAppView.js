import NobucaPanelView from "../panel/NobucaPanelView.js";
import NobucaDialogView from "../dialog/NobucaDialogView.js";

export default class NobucaAppView {

    constructor(appModel) {
        this.appModel = appModel;
        this.createRootPanel();
        this.listenAppModel();
    }

    getAppModel() {
        return this.appModel;
    }

    createRootPanel() {
        this.rootPanelView = new NobucaPanelView(this.getAppModel().getRootPanel());
        this.addRootPanelToDocumentBody(this.rootPanelView);
    }

    getRootPanelView() {
        return this.rootPanelView;
    }

    addRootPanelToDocumentBody(rootPanelView) {
        document.body.appendChild(rootPanelView.getNativeElement());
        rootPanelView.resizeToWindow();
    }

    listenAppModel() {
        this.getAppModel().getShowDialogEventEmitter().subscribe((dialogModel) => {
            let dialogView = new NobucaDialogView(dialogModel);
        });
        window.addEventListener("resize", (event) => {
            this.getRootPanelView().resizeToWindow();
        });
    }
}

