import NobucaComponentView from '../component/NobucaComponentView.js';
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaTabHeaderView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.deactivate();
        this.clickEventEmitter = new NobucaEventEmitter();
        this.closeEventEmitter = new NobucaEventEmitter();
    }

    getClickEventEmitter() {
        return this.clickEventEmitter;
    }

    getCloseEventEmitter() {
        return this.closeEventEmitter;
    }

    createNativeElement() {
        let divTabHeader = document.createElement("div");
        divTabHeader.className = "NobucaTabHeader";
        divTabHeader.addEventListener('click', (event) => {
            this.getClickEventEmitter().emit(this.getModel());
        });

        divTabHeader.classList.add('inactive');

        let divTabHeaderText = document.createElement("div");
        divTabHeader.appendChild(divTabHeaderText);
        divTabHeaderText.className = "NobucaTabHeaderText";
        divTabHeaderText.innerHTML = this.getModel().getText();

        divTabHeader.divTabHeaderText = divTabHeaderText;

        let divTabHeaderCloseButton = document.createElement("div");
        divTabHeader.appendChild(divTabHeaderCloseButton);
        divTabHeaderCloseButton.className = "NobucaTabHeaderCloseButton";
        divTabHeaderCloseButton.innerHTML = 'x';

        divTabHeader.divTabHeaderCloseButton = divTabHeaderCloseButton;

        divTabHeaderCloseButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.getCloseEventEmitter().emit(this.getModel());
        });

        divTabHeaderCloseButton.style.display = "none";
        if (this.getModel().getCloseable()) {
            divTabHeaderCloseButton.style.display = "";
        }

        this.setNativeElement(divTabHeader);
    }

    setCloseable(closeable) {
        this.getNativeElement().divTabHeaderCloseButton.style.display = "none";
        if (closeable) {
            this.getNativeElement().divTabHeaderCloseButton.style.display = "";
        }
    }

    setText(text) {
        this.getNativeElement().divTabHeaderText.innerHTML = text;
    }

    deactivate() {
        this.getNativeElement().classList.remove('active');
        this.getNativeElement().classList.add('inactive');
    }

    activate() {
        this.getNativeElement().classList.add('active');
        this.getNativeElement().classList.remove('inactive');
    }

    listenModel() {
        this.getModel().getTextChangeEventEmitter().subscribe(text => {
            this.setText(text);
        });
        this.getModel().getCloseableChangeEventEmitter().subscribe(closeable => {
            this.setCloseable(closeable);
        });
    }
}