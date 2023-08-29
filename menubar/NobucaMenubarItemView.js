import NobucaMenubaItemChildrenView from "./NobucaMenubaItemChildrenView.js";
import NobucaHtmlClassName from "../utils/NobucaHtmlClassName.js";

export default class NobucaMenubarItemView {
    constructor(menuItemModel) {
        this.expaned = false;

        this.menuItemModel = menuItemModel;

        if (menuItemModel.getSeparator()) {
            this.nativeElement = this.createSeparatorDiv();
        } else {
            this.nativeElement = this.createDiv();
            this.createChildMenuItemsViews();
        }
    }

    getMenuItemModel() {
        return this.menuItemModel;
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItem";

        div.appendChild(this.createMenuItemContents());

        div.addEventListener("click", () => {
            this.expandCollapse();
            this.getMenuItemModel().getClickEventEmitter().emit(this.getMenuItemModel());
        });

        return div;
    }

    createMenuItemContents() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemContents";
        div.appendChild(this.createMenuItemIcon());
        div.appendChild(this.createMenuItemText());
        div.appendChild(this.createMenuItemShortcut());
        return div;
    }

    createMenuItemIcon() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemIcon";

        if (this.getMenuItemModel().getIconImageSrc() != null) {
            let img = document.createElement("img");
            img.src = this.getMenuItemModel().getIconImageSrc();
            div.appendChild(img);
        } 

        return div;
    }

    createMenuItemText() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemText";
        if (this.getMenuItemModel().getText() != null) {
            div.innerHTML = this.getMenuItemModel().getText();
            div.style.display = "";
        } else {
            div.style.display = "none";
        }
        return div;
    }

    createMenuItemShortcut() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemShortcut";
        return div;
    }

    createSeparatorDiv() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemSeparator";
        return div;
    }

    hasChildMenuItems() {
        if (this.menuItemModel.menuItems.length === 0) return false;
        return true;
    }

    createChildMenuItemsViews() {
        if (this.menuItemModel.menuItems.length === 0) return;

        this.itemChildrenView = new NobucaMenubaItemChildrenView(
            this.menuItemModel
        );
        this.nativeElement.appendChild(this.itemChildrenView.nativeElement);
    }

    expandCollapse() {
        if (this.hasChildMenuItems()) {
            if (this.expanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }
    }

    expand() {
        this.expanded = true;
        NobucaHtmlClassName.addClassName(this.nativeElement, "expanded");
        if (this.itemChildrenView == null) return;
        this.itemChildrenView.expand();
        this.itemChildrenView.nativeElement.style.left =
            this.nativeElement.offsetLeft + "px";
    }

    collapse() {
        this.expanded = false;
        NobucaHtmlClassName.removeClassName(this.nativeElement, "expanded");
        if (this.itemChildrenView == null) return;
        this.itemChildrenView.collapse();
    }
}