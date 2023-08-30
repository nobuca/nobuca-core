import NobucaMenubaItemChildrenView from "./NobucaMenubarItemChildrenView.js";

export default class NobucaMenubarItemView {

    constructor(menuItemModel, menubarView, parentMenubarItemView) {
        this.menuItemModel = menuItemModel;
        this.menubarView = menubarView;
        this.parentMenubarItemView = parentMenubarItemView;
        this.expaned = false;

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

        this.menuItemContents = this.createMenuItemContents()
        div.appendChild(this.menuItemContents);
        this.listenMenuItemContentsEvents();

        div.addEventListener("click", () => {
            this.expandCollapse();
            this.getMenuItemModel().getClickEventEmitter().emit(this.getMenuItemModel());
        });

        return div;
    }

    createMenuItemContents() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemContents";
        if (this.getMenuItemModel().getDisabled()) {
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
        if (this.getMenuItemModel().getShortcut() != null) {
            div.innerHTML = this.getMenuItemModel().getShortcut();
            div.style.display = "";
        }
        return div;
    }

    createMenuItemChildrenMark() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemChildrenMark";
        if (this.getMenuItemModel().getMenuItems().length > 0) {
            div.innerHTML = "⏵";
        }
        return div;
    }

    createSeparatorDiv() {
        let div = document.createElement("div");
        div.className = "NobucaMenubarItemSeparator";
        return div;
    }

    hasChildMenuItems() {
        if (this.getMenuItemModel().getMenuItems().length === 0) return false;
        return true;
    }

    getMenubarView() {
        return this.menubarView;
    }

    getParentMenubarItemView() {
        return this.parentMenubarItemView;
    }

    createChildMenuItemsViews() {
        if (this.getMenuItemModel().getMenuItems().length === 0) return;

        this.itemChildrenView = new NobucaMenubaItemChildrenView(
            this.menuItemModel,
            this.getMenubarView(),
            this
        );

        this.nativeElement.appendChild(this.itemChildrenView.nativeElement);
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
        this.nativeElement.classList.add("expanded");
        if (this.itemChildrenView == null) return;
        this.itemChildrenView.expand();
        if (this.isFirstLevelMenuItem()) {
            this.itemChildrenView.nativeElement.style.left =
                this.nativeElement.offsetLeft + "px";
        } else {
            var top = this.nativeElement.offsetTop;
            var left = this.nativeElement.offsetLeft + this.nativeElement.offsetWidth;
            this.itemChildrenView.nativeElement.style.top = top + "px";
            this.itemChildrenView.nativeElement.style.left = left + "px";
        }
    }

    collapse() {
        if (!this.expanded) return;
        this.expanded = false;
        this.nativeElement.classList.remove("expanded");
        if (this.itemChildrenView == null) return;
        this.itemChildrenView.collapse();
    }
}