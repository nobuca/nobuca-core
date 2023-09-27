import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class BlenderControlButtonView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "NobucaButtonBar";
        this.setNativeElement(div);
        this.createItems();
    }

    createItems() {
        this.divItems = document.createElement("div");
        this.divItems.className = "NobucaButtonBarItems";
        this.getNativeElement().appendChild(this.divItems);
        this.getModel().getItems().forEach(buttonBarItemModel => this.createItem(buttonBarItemModel));
    }

    getDivItems() {
        return this.divItems;
    }

    createItem(buttonBarItemModel) {
        var divItem = document.createElement("div");
        divItem.className = "NobucaButtonBarItem";
        this.getDivItems().appendChild(divItem);

        if (buttonBarItemModel.getImageSrc() != null) {
            var imgImage = document.createElement("img");
            imgImage.className = "NobucaButtonBarItemImg";
            imgImage.src = buttonBarItemModel.getImageSrc();
            divItem.appendChild(imgImage);
        } else {
            var buttonBarItemView = NobucaFactory.createNewViewForModel(buttonBarItemModel);
            divItem.appendChild(buttonBarItemView.getNativeElement());
        }
    }
}