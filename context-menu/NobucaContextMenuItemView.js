import NobucaComponentView from '../component/NobucaComponentView.js';
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaContextMenuItemView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.nativeElement = this.createDiv();

        this.menuItemClickedEventEmitter = new NobucaEventEmitter()

        this.nativeElement.addEventListener('click', event => {
            this.getMenuItemClickedEventEmitter().emit(this.menuItemModel);
        });
    }

    getMenuItemClickedEventEmitter() {
        return this.menuItemClickedEventEmitter;
    }

    createDiv() {

        let div = document.createElement('div');
        div.className = 'NobucaContextMenuItem';

        if (this.getModel().getSeparator()) {
            div.className = 'NobucaContextMenuItemSeparator';
            return div;
        }

        div.appendChild(this.createMenuItemText());

        div.addEventListener('click', () => {
            this.getModel().getClickedEventEmitter().emit(this.getModel());
        });

        return div;
    }

    createMenuItemText() {
        let div = document.createElement('div');
        div.className = 'NobucaContextMenuItemText';
        div.innerHTML = this.getModel().getText();
        return div;
    }

}