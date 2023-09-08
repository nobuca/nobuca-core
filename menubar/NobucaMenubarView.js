import NobucaMenubarItemView from "./NobucaMenubarItemView.js";
import NobucaHtmlElementIsDescendantOf from "../utils/NobucaHtmlElementIsDescendantOf.js";
import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaMenubarView extends NobucaComponentView {
    constructor(model) {
        super(model);
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

    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaMenubar";
        this.setNativeElement(div);
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
        let menuItemView = new NobucaMenubarItemView(menuItemModel);
        menuItemView.setMenubarView(this);
        this.getNativeElement().appendChild(menuItemView.getNativeElement());
        this.getMenuItemViewList().push(menuItemView);
        menuItemView
            .getModel()
            .getClickedEventEmitter()
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
        this.getNativeElement().style.width = width + "px";
        this.getNativeElement().style.height = this.getModel().getSize().getFixedHeight() + "px";
    }

    setPosition(top, left) {
        this.getNativeElement().style.top = top + "px";
        this.getNativeElement().style.left = left + "px";
    }
}