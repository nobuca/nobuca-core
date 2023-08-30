import NobucaMenubarItemView from "./NobucaMenubarItemView.js";
import NobucaHtmlElementIsDescendantOf from "../utils/NobucaHtmlElementIsDescendantOf.js";

export default class NobucaMenubarView {
    constructor(menubarModel) {
        this.nativeElement = this.createDiv();
        this.menubarModel = menubarModel;
        this.menuItemViewList = [];
        this.createMenuItemsViews();

        this.listenMenubarModelEvents();

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

    getMenubarModel() {
        return this.menubarModel;
    }

    updateViewFromModel() {
        this.createMenuItemsViews();
    }

    createMenuItemsViews() {
        this.getMenubarModel()
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
            .getMenuItemModel()
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
        this.nativeElement.style.height = this.getMenubarModel().getSize().getFixedHeight() + "px";
    }

    setPosition(top, left) {
        this.nativeElement.style.top = top + "px";
        this.nativeElement.style.left = left + "px";
    }

    listenMenubarModelEvents() {
        this.getMenubarModel()
            .getPosition()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.setPosition(
                    this.getMenubarModel().getPosition().getTop(),
                    this.getMenubarModel().getPosition().getLeft()
                );
            });

        this.getMenubarModel()
            .getSize()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.setSize(
                    this.getMenubarModel().getSize().getWidth(),
                    this.getMenubarModel().getSize().getHeight()
                );
            });
    }
}