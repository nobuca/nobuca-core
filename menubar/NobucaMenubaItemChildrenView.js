import NobucaMenubarItemView from './NobucaMenubarItemView.js';

export default class NobucaMenubarItemChildrenView {

    constructor(menuItemModel) {
        this.menuItemModel = menuItemModel;
        this.nativeElement = this.createDiv();
        this.createChildItems();
    }

    createDiv() {
        let div = document.createElement('div');
        div.className = 'NobucaMenubarChildMenuItems';
        div.style.display = 'none';
        return div;
    }

    createChildItems() {
        this.menuItemModel.menuItems.forEach(childMenuItemModel => {
            let childMenuItemView = new NobucaMenubarItemView(childMenuItemModel);
            this.nativeElement.appendChild(childMenuItemView.nativeElement);
        });
    }

    expand() {
        this.nativeElement.style.display = 'flex';
    }

    collapse() {
        this.nativeElement.style.display = 'none';
    }
}
