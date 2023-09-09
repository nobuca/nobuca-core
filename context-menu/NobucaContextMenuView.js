import NobucaContextMenuModel from './NobucaContextMenuModel.js';
import NobucaContextMenuItemView from './NobucaContextMenuItemView.js';
import NobucaContextMenuTitleView from './NobucaContextMenuTitleView.js';
import NobucaHtmlElementIsDescendantOf from '../utils/NobucaHtmlElementIsDescendantOf.js';
import NobucaComponentView from '../component/NobucaComponentView.js';


export default class NobucaContextMenuView extends NobucaComponentView {

    static showingContextMenuView;

    constructor(contextMenuModel) {
        super(contextMenuModel)
        this.menuItemViewList = [];
        this.createTitle();
        this.createMenuItems();
    }

    createNativeElement() {
        let div = document.createElement('div');
        div.className = 'NobucaContextMenu';
        document.body.appendChild(div);
        this.setNativeElement(div);
    }

    createTitle() {
        this.titleView = new NobucaContextMenuTitleView(this.getModel());
        this.getNativeElement().appendChild(this.getTitleView().getNativeElement());
    }

    getTitleView() {
        return this.titleView;
    }

    updateTitle() {
        if (this.getModel().getTitle() == null) return;
    }

    createMenuItems() {
        this.menuItemViewList.forEach(menuItemView => {
            menuItemView.getNativeElement().parentNode.removeChild(menuItemView.getNativeElement());
        });
        this.menuItemViewList = [];
        this.getModel().menuItems.forEach(menuItemModel => {
            this.createMenuItem(menuItemModel);
        });
    }

    createMenuItem(menuItemModel) {
        let menuItemView = new NobucaContextMenuItemView(menuItemModel);
        this.getNativeElement().appendChild(menuItemView.getNativeElement());
        this.menuItemViewList.push(menuItemView);
        if (!menuItemModel.getSeparator()) {
            menuItemModel.getClickedEventEmitter().subscribe(event => {
                this.hide();
            });
        }
    }

    getContextMenuModel() {
        return this.getModel();
    }

    updateViewFromModel() {
        this.titleView.updateViewFromModel();
        this.createMenuItems();
    }

    show(x, y) {
        this.hide();
        this.getContextMenuModel().setX(x);
        this.getContextMenuModel().setY(y);
        this.getNativeElement().style.left = x + 'px';
        this.getNativeElement().style.top = y + 'px';
        this.getNativeElement().style.display = 'flex';
        NobucaContextMenuView.showingContextMenuView = this;
    }

    getX() {
        return this.getNativeElement().offsetLeft;
    }

    getY() {
        return this.getNativeElement().offsetTop;
    }

    hide() {
        if (NobucaContextMenuView.showingContextMenuView != null) {
            NobucaContextMenuView.showingContextMenuView.getNativeElement().style.display = 'none';
            NobucaContextMenuView.showingContextMenuView = null;
        }
    }
}

window.addEventListener('click', (event) => {
    if (NobucaContextMenuView.showingContextMenuView == null) return;
    if (!NobucaHtmlElementIsDescendantOf.check(event.target,
            NobucaContextMenuView.showingContextMenuView.getNativeElement())) {
        NobucaContextMenuView.showingContextMenuView.hide();
    }
});

window.addEventListener('wheel', (event) => {
    if (NobucaContextMenuView.showingContextMenuView == null) return;
    NobucaContextMenuView.showingContextMenuView.hide();
});