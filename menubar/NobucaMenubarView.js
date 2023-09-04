import NobucaMenubarItemView from "./NobucaMenubarItemView.js";
import NobucaHtmlElementIsDescendantOf from "../utils/NobucaHtmlElementIsDescendantOf.js";
import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaMenubarView extends NobucaComponentView {
    constructor(model) {
        super(model);
        this.nativeElement = this.createDiv();
        this.menuItemViewList = [];
        this.createMenuItemsViews();

        window.addEventListener("click", (event) => {
            if (!NobucaHtmlElementIsDescendantOf.check(event.target, this.nativeElement)) {
                this.collapseAll();
            }
        });

        window.addEventListener("contextmenu", (event) => {
            this.collapseAll();
        });

        window.addEventListener("wheel", (event) => {
            this.collapseAll();
        });
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaMenubar";
        return div;
    }


    updateViewFromModel() {
        this.createMenuItemsViews();
    }

    createMenuItemsViews() {
        this.getModel()
            .getMenuItems()
            .forEach((menuItemModel) => {
                this.creaMenuItemView(menuItemModel);
            });
    }

    getMenuItemViewList() {
        return this.menuItemViewList;
    }

    creaMenuItemView(menuItemModel) {
        let menuItemView = new NobucaMenubarItemView(menuItemModel, this, null);
        this.nativeElement.appendChild(menuItemView.nativeElement);
        this.getMenuItemViewList().push(menuItemView);
        menuItemView
            .getModel()
            .getClickEventEmitter()
            .subscribe(() => {
                this.collapseAllButTheMenuItem(menuItemView);
            });
    }

    collapseAll() {
        this.getMenuItemViewList().forEach((menuItemView) => {
            menuItemView.collapse();
        });
    }

    collapseAllButTheMenuItem(excludedMenuItemView) {
        this.getMenuItemViewList().forEach((menuItemView) => {
            if (menuItemView !== excludedMenuItemView) {
                menuItemView.collapse();
            }
        });
    }

    setSize(width, height) {
        this.nativeElement.style.width = width + "px";
        this.nativeElement.style.height = this.getModel().getSize().getFixedHeight() + "px";
    }

    setPosition(top, left) {
        this.nativeElement.style.top = top + "px";
        this.nativeElement.style.left = left + "px";
    }

    listenModel() {
        this.getModel()
            .getPosition()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.setPosition(
                    this.getModel().getPosition().getTop(),
                    this.getModel().getPosition().getLeft()
                );
            });

        this.getModel()
            .getSize()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.setSize(
                    this.getModel().getSize().getWidth(),
                    this.getModel().getSize().getHeight()
                );
            });
    }
}