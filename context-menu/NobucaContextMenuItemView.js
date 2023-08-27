import NobucaUiEventEmitter from '../event/NobucaUiEventEmitter.js';

export default class NobucaContextMenuItemView {

    constructor(menuItemModel) {
        this.menuItemModel = menuItemModel;
        this.nativeElement = this.createDiv();

        this.menuItemClickEventEmitter = new NobucaUiEventEmitter()

        this.nativeElement.addEventListener('click', event => {
            this.getMenuItemClickEventEmitter().emit(this.menuItemModel);
        });
    }

    getMenuItemClickEventEmitter() {
        return this.menuItemClickEventEmitter;
    }

    getMenuItemModel() {
        return this.menuItemModel;
    }

    createDiv() {

        let div = document.createElement('div');
        div.className = 'NobucaContextMenuItem';

        if (this.getMenuItemModel().getSeparator()) {
            div.className = 'NobucaContextMenuItemSeparator';
            return div;
        }

        div.appendChild(this.createMenuItemText());

        div.addEventListener('click', () => {
            this.getMenuItemModel().getClickEventEmitter().emit(this.getMenuItemModel());
        });

        return div;
    }

    createMenuItemText() {
        let div = document.createElement('div');
        div.className = 'NobucaContextMenuItemText';
        div.innerHTML = this.getMenuItemModel().getText();
        return div;
    }

}