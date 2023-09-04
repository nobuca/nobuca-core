import NobucaPanelView from "../panel/NobucaPanelView.js";
import NobucaDialogView from "../dialog/NobucaDialogView.js";
import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaAppView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createRootPanel();
    }

    createRootPanel() {
        this.rootPanelView = new NobucaPanelView(this.getModel().getRootPanel());
        this.addRootPanelToDocumentBody(this.rootPanelView);
    }

    getRootPanelView() {
        return this.rootPanelView;
    }

    addRootPanelToDocumentBody(rootPanelView) {
        document.body.appendChild(rootPanelView.getNativeElement());
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

