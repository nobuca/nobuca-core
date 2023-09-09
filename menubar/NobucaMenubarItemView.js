import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaMenubaItemChildrenView from "./NobucaMenubarItemChildrenView.js";

export default class NobucaMenubarItemView extends NobucaComponentView {

    constructor(menuItemModel) {
        super(menuItemModel);
        this.expaned = false;
    }

    createNativeElement() {

        if (this.getModel().getSeparator()) {
            this.createNativeElementSeparator();
            return;
        }

        let div = document.createElement("div");
        div.className = "NobucaMenubarItem";

        this.menuItemContents = this.createMenuItemContents()
        div.appendChild(this.menuItemContents);
        this.listenMenuItemContentsEvents();

        div.addEventListener("click", () => {
            this.expandCollapse();
            this.getModel().getClickedEventEmitter().emit(this.getModel());
        });

        this.setNativeElement(div);

        this.createChildMenuItemsViews();
    }

    getMenubarView() {
        return this.menubarView;
    }

    setMenubarView(menubarView) {
        this.menubarView = menubarView;
        if (this.getItemChildrenView() == null) return;
        this.getItemChildrenView().setMenubarView(this.getMenubarView());
    }

    getParentMenubarItemView() {
        return this.parentMenubarItemView;
    }

    setParentMenubarItemView(parentMenubarItemView) {
        this.parentMenubarItemView = parentMenubarItemView;
    }

    createNativeElementSeparator() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemSeparator";
        this.setNativeElement(div);
    }

    createMenuItemContents() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemContents";
        if (this.getModel().getDisabled()) {
            div.className += " disabled";
        }
        div.appendChild(this.createMenuItemIcon());
        div.appendChild(this.createMenuItemText());
        div.appendChild(this.createMenuItemShortcut());
        div.appendChild(this.createMenuItemChildrenMark());
        return div;
    }

    listenMenuItemContentsEvents() {
        this.menuItemContents.addEventListener("mouseover", (event) => {
            event.stopPropagation();
            if (this.isFirstLevelMenuItem()) {
                if (this.otherFirstLevelMenuItemExpanded()) {
                    if (this.hasChildMenuItems()) {
                        this.collapseCurrentlyExpandedMenuItems();
                        this.expand();
                    } else {
                        this.collapseCurrentlyExpandedMenuItems();
                    }
                }
            } else {
                this.collapseCurrentlyExpandedMenuItems();
                this.expand();
            }
        });
    }

    createMenuItemIcon() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemIcon";

        if (this.getModel().getIconImageSrc() != null) {
            let img = document.createElement("img");
            img.src = this.getModel().getIconImageSrc();
            div.appendChild(img);
        }

        return div;
    }

    createMenuItemText() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemText";
        if (this.getModel().getText() != null) {
            div.innerHTML = this.getModel().getText();
            div.style.display = "";
        } else {
            div.style.display = "none";
        }
        return div;
    }

    createMenuItemShortcut() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemShortcut";
        if (this.getModel().getShortcut() != null) {
            div.innerHTML = this.getModel().getShortcut();
            div.style.display = "";
        }
        return div;
    }

    createMenuItemChildrenMark() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemChildrenMark";
        if (this.getModel().getMenuItems().length > 0) {
            div.innerHTML = "⏵";
        }
        return div;
    }

    hasChildMenuItems() {
        if (this.getModel().getMenuItems().length === 0) return false;
        return true;
    }

    createChildMenuItemsViews() {
        if (this.getModel().getMenuItems().length === 0) return;

        this.itemChildrenView = new NobucaMenubaItemChildrenView(this.getModel());

        this.itemChildrenView.setParentMenubarItemView(this);

        this.getNativeElement().appendChild(this.getItemChildrenView().getNativeElement());
    }

    getItemChildrenView() {
        return this.itemChildrenView;
    }

    isFirstLevelMenuItem() {
        return this.getParentMenubarItemView() == null;
    }

    otherFirstLevelMenuItemExpanded() {
        var found = false;
        var i = 0;
        while (!found && i < this.getMenubarView().getMenuItemViewList().length) {
            var menuItemView = this.getMenubarView().getMenuItemViewList()[i];
            if (menuItemView != this && menuItemView.expanded) {
                found = true;
            }
            i++;
        }
        return found;
    }

    collapseCurrentlyExpandedMenuItems() {
        this.getMenubarView().getMenuItemViewList().forEach(menuItemView => menuItemView.collapse());
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

    expandAncestors() {
        if (this.getParentMenubarItemView() == null) return;
        this.getParentMenubarItemView().expand();
        this.getParentMenubarItemView().expandAncestors();
    }

    expand() {
        if (this.expanded) return;
        this.expandAncestors();
        this.expanded = true;
        this.getNativeElement().classList.add("expanded");
        if (this.itemChildrenView == null) return;
        this.getItemChildrenView().expand();
        if (this.isFirstLevelMenuItem()) {
            this.getItemChildrenView().getNativeElement().style.left =
                this.getNativeElement().offsetLeft + "px";
        } else {
            var top = this.getNativeElement().offsetTop;
            var left = this.getNativeElement().offsetLeft + this.getNativeElement().offsetWidth;
            this.getItemChildrenView().getNativeElement().style.top = top + "px";
            this.getItemChildrenView().getNativeElement().style.left = left + "px";
        }
    }

    collapse() {
        if (!this.expanded) return;
        this.expanded = false;
        this.getNativeElement().classList.remove("expanded");
        if (this.itemChildrenView == null) return;
        this.getItemChildrenView().collapse();
    }
}