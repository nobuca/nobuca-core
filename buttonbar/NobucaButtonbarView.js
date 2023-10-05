import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaButtonbarView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "NobucaButtonbar";
        this.setNativeElement(div);
        this.createHandle();
        this.createItems();
    }

    createHandle() {
        if (!this.getModel().getMoveable()) return;
        var img = document.createElement("img");
        img.className = "NobucaButtonbarHandle";
        img.src = "/nobuca-core/buttonbar/buttonbar-handle-vertical.svg";
        this.getNativeElement().appendChild(img);
    }

    createItems() {
        this.divItems = document.createElement("div");
        this.divItems.className = "NobucaButtonbarItems";
        this.getNativeElement().appendChild(this.divItems);
        this.getModel().getItems().forEach(buttonbarItemModel => this.createItem(buttonbarItemModel));
    }

    getDivItems() {
        return this.divItems;
    }

    createItem(buttonbarItemModel) {
        var divItem = document.createElement("div");
        divItem.className = "NobucaButtonbarItem";
        this.getDivItems().appendChild(divItem);

        this.setTooltip(divItem, buttonbarItemModel.getTooltip());

        var imgImage = document.createElement("img");
        imgImage.className = "NobucaButtonbarItemImg";
        imgImage.src = buttonbarItemModel.getImageSrc();
        divItem.appendChild(imgImage);

        divItem.addEventListener("mousedown", () => {
            buttonbarItemModel.getClickedEventEmitter().emit();
        });
    }

}