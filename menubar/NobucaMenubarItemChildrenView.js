import NobucaMenubarItemView from './NobucaMenubarItemView.js';

export default class NobucaMenubarItemChildrenView {

    constructor(menuItemModel, menubarView, parentMenubarItemView) {
        this.menuItemModel = menuItemModel;
        this.menubarView = menubarView;
        this.parentMenubarItemView = parentMenubarItemView;
        this.nativeElement = this.createDiv();
        this.menuItemViewList = [];
        this.createChildItems();
    }

    getModel() {
        return this.menuItemModel;
    }

    getMenuItemViewList() {
        return this.menuItemViewList;
    }

    createDiv() {
        let div = document.createElement('div');
        div.className = 'NobucaMenubarChildMenuItems';
        div.style.display = 'none';
        return div;
    }

    createChildItems() {
        this.getModel().getMenuItems().forEach(childMenuItemModel => {
            let childMenuItemView = new NobucaMenubarItemView(childMenuItemModel, this.getMenubarView(), this.getParentMenubarItemView());
            this.nativeElement.appendChild(childMenuItemView.nativeElement);
            this.getMenuItemViewList().push(childMenuItemView);
        });
    }

    getMenubarView() {
        return this.menubarView;
    }

    getParentMenubarItemView() {
        return this.parentMenubarItemView;
    }

    expand() {
        this.expanded = true;
        this.nativeElement.style.display = 'flex';
    }

    collapse() {
        this.expanded = false;
        this.nativeElement.style.display = 'none';
        this.getMenuItemViewList().forEach(menuItemView => menuItemView.collapse());
    }
}