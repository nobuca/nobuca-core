import NobucaComponentView from '../component/NobucaComponentView.js';
import NobucaMenubarItemView from './NobucaMenubarItemView.js';

export default class NobucaMenubarItemChildrenView extends NobucaComponentView {

    constructor(menuItemModel) {
        super(menuItemModel);
        this.createChildItems();
    }

    getMenuItemViewList() {
        return this.menuItemViewList;
    }

    createNativeElement() {
        let div = document.createElement('div');
        div.className = 'NobucaMenubarChildMenuItems';
        div.style.display = 'none';
        this.setNativeElement(div);
    }

    createChildItems() {
        this.menuItemViewList = [];
        this.getModel().getMenuItems().forEach(childMenuItemModel => {
            let childMenuItemView = new NobucaMenubarItemView(childMenuItemModel);
            this.getNativeElement().appendChild(childMenuItemView.getNativeElement());
            this.getMenuItemViewList().push(childMenuItemView);
        });
    }

    getMenubarView() {
        return this.menubarView;
    }

    setMenubarView(menubarView) {
        this.menubarView = menubarView;
        this.getMenuItemViewList().forEach(menuItemView => menuItemView.setMenubarView(this.getMenubarView()));
    }

    getParentMenubarItemView() {
        return this.parentMenubarItemView;
    }

    setParentMenubarItemView(parentMenubarItemView) {
        this.parentMenubarItemView = parentMenubarItemView;
        this.getMenuItemViewList().forEach(menuItemView => menuItemView.setParentMenubarItemView(this.getParentMenubarItemView()));
    }

    expand() {
        this.expanded = true;
        this.getNativeElement().style.display = 'flex';
    }

    collapse() {
        this.expanded = false;
        this.getNativeElement().style.display = 'none';
        this.getMenuItemViewList().forEach(menuItemView => menuItemView.collapse());
    }
}