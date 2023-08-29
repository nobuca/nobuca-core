import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaTabHeaderView {

    constructor(tabModel) {
        this.tabModel = tabModel;
        this.nativeElement = this.createDivTabHeader();
        this.deactivate();
        this.clickEventEmitter = new NobucaEventEmitter();
        this.closeEventEmitter = new NobucaEventEmitter();
        this.listenTabModelEvents(this.tabModel);
    }

    getTabModel() {
        return this.tabModel;
    }

    getClickEventEmitter() {
        return this.clickEventEmitter;
    }

    getCloseEventEmitter() {
        return this.closeEventEmitter;
    }

    createDivTabHeader() {
        let divTabHeader = document.createElement("div");
        divTabHeader.className = "NobucaTabHeader";
        divTabHeader.addEventListener('click', (event) => {
            this.getClickEventEmitter().emit(this.getTabModel());
        });

        divTabHeader.classList.add('inactive');

        let divTabHeaderText = document.createElement("div");
        divTabHeader.appendChild(divTabHeaderText);
        divTabHeaderText.className = "NobucaTabHeaderText";
        divTabHeaderText.innerHTML = this.getTabModel().getText();

        divTabHeader.divTabHeaderText = divTabHeaderText;

        let divTabHeaderCloseButton = document.createElement("div");
        divTabHeader.appendChild(divTabHeaderCloseButton);
        divTabHeaderCloseButton.className = "NobucaTabHeaderCloseButton";
        divTabHeaderCloseButton.innerHTML = 'x';

        divTabHeader.divTabHeaderCloseButton = divTabHeaderCloseButton;

        divTabHeaderCloseButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.getCloseEventEmitter().emit(this.getTabModel());
        });

        divTabHeaderCloseButton.style.display = "none";
        if (this.getTabModel().getCloseable()) {
            divTabHeaderCloseButton.style.display = "";
        }

        return divTabHeader;
    }

    setCloseable(closeable) {
        this.nativeElement.divTabHeaderCloseButton.style.display = "none";
        if (closeable) {
            this.nativeElement.divTabHeaderCloseButton.style.display = "";
        }
    }

    setText(text) {
        this.nativeElement.divTabHeaderText.innerHTML = text;
    }

    deactivate() {
        this.nativeElement.classList.remove('active');
        this.nativeElement.classList.add('inactive');
    }

    activate() {
        this.nativeElement.classList.add('active');
        this.nativeElement.classList.remove('inactive');
    }

    listenTabModelEvents(tabModel) {
        tabModel.getTextChangeEventEmitter().subscribe(text => {
            this.setText(text);
        });
        tabModel.getCloseableChangeEventEmitter().subscribe(closeable => {
            this.setCloseable(closeable);
        });
    }
}