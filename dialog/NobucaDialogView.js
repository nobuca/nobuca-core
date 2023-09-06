import NobucaButtonView from "../button/NobucaButtonView.js";
import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaDialogView extends NobucaComponentView{

    constructor(dialogModel) {
        super(dialogModel);
        this.divDialogBackground = this.createDivDialogBackground();
        this.createDivDialog();
    }

    createDivDialogBackground() {
        let divDialogBackground = document.createElement("div");
        document.body.append(divDialogBackground);
        divDialogBackground.className = "NobucaDialogBackground";
        divDialogBackground.style.display = "flex";
        divDialogBackground.style.top = "0px";
        divDialogBackground.style.left = "0px";
        divDialogBackground.style.width = window.innerWidth + "px";
        divDialogBackground.style.height = window.innerHeight + "px";

        return divDialogBackground;
    }

    createDivDialog() {
        let divDialog = document.createElement("div");
        document.body.append(divDialog);
        divDialog.className = "NobucaDialog";

        divDialog.style.display = "flex";
        divDialog.style.width = this.getModel().getWidth() + "px";
        divDialog.style.height = this.getModel().getHeight() + "px";

        divDialog.style.top =
            window.innerHeight / 2 - divDialog.offsetHeight / 2 + "px";
        divDialog.style.left =
            window.innerWidth / 2 - divDialog.offsetWidth / 2 + "px";

        this.divDialog = divDialog;

        this.createDivHeader();
        this.divDialogBody = this.createDivBody();
        this.divDialogButtons = this.createDivButtons();

        return divDialog;
    }

    getDivDialog() {
        return this.divDialog;
    }

    getDivDialogHeader() {
        return this.divDialogHeader;
    }

    close() {
        this.getDivDialog().parentNode.removeChild(this.divDialog);
        this.divDialogBackground.parentNode.removeChild(this.divDialogBackground);
    }

    createDivHeader() {
        let divDialogHeader = document.createElement("div");
        this.getDivDialog().appendChild(divDialogHeader);
        divDialogHeader.className = "NobucaDialogHeader";
        this.divDialogHeader = divDialogHeader;
        this.createDivHeaderTitle();
        return divDialogHeader;
    }

    createDivHeaderTitle() {
        let divDialogHeaderTitle = document.createElement("div");
        this.getDivDialogHeader().appendChild(divDialogHeaderTitle);
        divDialogHeaderTitle.className = "NobucaDialogHeaderTitle";
        divDialogHeaderTitle.innerHTML = this.getModel().getTitle();
        return divDialogHeaderTitle;
    }

    createDivBody() {
        let divDialogBody = document.createElement("div");
        this.getDivDialog().appendChild(divDialogBody);
        divDialogBody.className = "NobucaDialogBody";
        return divDialogBody;
    }

    addChild(view) {
        this.divDialogBody.appendChild(view.getNativeElement());
    }

    clearChildren() {
        while (this.divDialogBody.childNodes.length > 0) {
            this.divDialogBody.removeChild(this.divDialogBody.childNodes[0]);
        }
    }

    clearButtons() {
        while (this.divDialogButtons.childNodes.length > 0) {
            this.divDialogButtons.removeChild(this.divDialogButtons.childNodes[0]);
        }
    }

    createDivButtons() {
        let divDialogButtons = document.createElement("div");
        this.divDialog.append(divDialogButtons);
        divDialogButtons.className = "NobucaDialogButtons";
        return divDialogButtons;
    }

    listenModel() {
        this.getModel()
            .getAddChildEventEmitter()
            .subscribe((childModel) => {
                let childView = this.createNewViewForModel(childModel);
                this.addChild(childView);
            });

        this.getModel()
            .getClearChildrenEventEmitter()
            .subscribe(() => {
                this.clearChildren();
            });

        this.getModel()
            .getAddButtonEventEmitter()
            .subscribe((buttonModel) => {
                this.buttonView = new NobucaButtonView(buttonModel);
                this.divDialogButtons.appendChild(this.buttonView.getNativeElement());;
            });

        this.getModel()
            .getClearButtonsEventEmitter()
            .subscribe(() => {
                this.clearButtons();
            });

        this.getModel()
            .getCloseEventEmitter()
            .subscribe(() => {
                this.close();
            });
    }
}