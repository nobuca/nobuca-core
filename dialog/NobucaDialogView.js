import NobucaButtonView from "../button/NobucaButtonView.js";
import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";
import NobucaDialogModel from "./NobucaDialogModel.js";

export default class NobucaDialogView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.updateContentsPositionAndSize();
    }

    createNativeElement() {
        this.createDivDialogBackground();
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

        this.divDialogBackground = divDialogBackground;
    }

    getDivDialogBackground() {
        return this.divDialogBackground;
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
        this.createDivHeaderIcon();
        this.createDivHeaderTitle();
        return divDialogHeader;
    }

    createDivHeaderIcon() {
        var iconSrc = this.getModel().getIconSrc();
        if (iconSrc == null) iconSrc = NobucaDialogModel.getDefaultIconSrc();
        if (iconSrc == null) return;
        let divDialogHeaderIcon = document.createElement("img");
        this.getDivDialogHeader().appendChild(divDialogHeaderIcon);
        divDialogHeaderIcon.className = "NobucaDialogHeaderIcon";
        divDialogHeaderIcon.src = iconSrc;
        return divDialogHeaderIcon;
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
        this.getModel().getChildren().forEach(childModel => {
            let childView = NobucaFactory.createNewViewForModel(childModel);
            divDialogBody.appendChild(childView.getNativeElement());
        });
        return divDialogBody;
    }

    updateContentsPositionAndSize() {
        this.getDivDialogBackground().style.width = window.innerWidth + "px";
        this.getDivDialogBackground().style.height = window.innerHeight + "px";

        this.getDivDialog().style.top =
            window.innerHeight / 2 - this.getDivDialog().offsetHeight / 2 + "px";
        this.getDivDialog().style.left =
            window.innerWidth / 2 - this.getDivDialog().offsetWidth / 2 + "px";
    }

    listenModel() {
        this.getModel()
            .getCloseEventEmitter()
            .subscribe(() => {
                this.close();
            });
    }
}