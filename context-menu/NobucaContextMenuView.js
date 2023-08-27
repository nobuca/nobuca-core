import NobucaContextMenuModel from './NobucaContextMenuModel.js';
import NobucaContextMenuItemView from './NobucaContextMenuItemView.js';
import NobucaContextMenuTitleView from './NobucaContextMenuTitleView.js';
import NobucaHtmlElementIsDescendantOf from '../utils/NobucaHtmlElementIsDescendantOf.js';


export default class NobucaContextMenuView {

    static showingContextMenuView;

    constructor(contextMenuModel) {
        if (contextMenuModel != null) {
            this.contextMenuModel = contextMenuModel;
        } else {
            this.contextMenuModel = new NobucaContextMenuModel();
        }
        this.menuItemViewList = [];
        this.nativeElement = this.createDiv();
        this.createTitle();
        this.createMenuItems();
    }

    getContextMenuModel() {
        return this.contextMenuModel;
    }

    createDiv() {
        let div = document.createElement('div');
        div.className = 'NobucaContextMenu';
        document.body.appendChild(div);
        return div;
    }

    createTitle() {
        this.titleView = new NobucaContextMenuTitleView(this.contextMenuModel);
        this.nativeElement.appendChild(this.titleView.nativeElement);
    }

    updateTitle() {
        if (this.contextMenuModel.getTitle() == null) return;
    }

    createMenuItems() {
        this.menuItemViewList.forEach(menuItemView => {
            menuItemView.nativeElement.parentNode.removeChild(menuItemView.nativeElement);
        });
        this.menuItemViewList = [];
        this.contextMenuModel.menuItems.forEach(menuItemModel => {
            this.createMenuItem(menuItemModel);
        });
    }

    createMenuItem(menuItemModel) {
        let menuItemView = new NobucaContextMenuItemView(menuItemModel);
        this.nativeElement.appendChild(menuItemView.nativeElement);
        this.menuItemViewList.push(menuItemView);
        if (!menuItemModel.getSeparator()) {
            menuItemModel.getClickEventEmitter().subscribe(event => {
                this.hide();
            });
        }
    }

    getContextMenuModel() {
        return this.contextMenuModel;
    }

    updateViewFromModel() {
        this.titleView.updateViewFromModel();
        this.createMenuItems();
    }

    show(x, y) {
        this.hide();
        this.getContextMenuModel().setX(x);
        this.getContextMenuModel().setY(y);
        this.nativeElement.style.left = x + 'px';
        this.nativeElement.style.top = y + 'px';
        this.nativeElement.style.display = 'flex';
        NobucaContextMenuView.showingContextMenuView = this;
    }

    getX() {
        return this.nativeElement.offsetLeft;
    }

    getY() {
        return this.nativeElement.offsetTop;
    }

    hide() {
        if (NobucaContextMenuView.showingContextMenuView != null) {
            NobucaContextMenuView.showingContextMenuView.nativeElement.style.display = 'none';
            NobucaContextMenuView.showingContextMenuView = null;
        }
    }
}

window.addEventListener('click', (event) => {
    if (NobucaContextMenuView.showingContextMenuView == null) return;
    if (!NobucaHtmlElementIsDescendantOf.check(event.target,
            NobucaContextMenuView.showingContextMenuView.nativeElement)) {
        NobucaContextMenuView.showingContextMenuView.hide();
    }
});

window.addEventListener('wheel', (event) => {
    if (NobucaContextMenuView.showingContextMenuView == null) return;
    NobucaContextMenuView.showingContextMenuView.hide();
});