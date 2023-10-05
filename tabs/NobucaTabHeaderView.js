import NobucaComponentView from '../component/NobucaComponentView.js';
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaTabHeaderView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.deactivate();
    }

    createNativeElement() {
        let divTabHeader = document.createElement("div");
        divTabHeader.className = "NobucaTabHeader";
        
        divTabHeader.addEventListener('click', (event) => {
            this.getModel().getClickedEventEmitter().emit();
        });

        divTabHeader.addEventListener('dblclick', (event) => {
            this.getModel().getDoubleClickedEventEmitter().emit();
        });

        divTabHeader.classList.add('inactive');

        if (this.getModel().getImageSrc() != null) {
            let imgTabHeaderIcon = document.createElement("img");
            divTabHeader.appendChild(imgTabHeaderIcon);
            imgTabHeaderIcon.className = "NobucaTabHeaderIcon";
            imgTabHeaderIcon.src = this.getModel().getImageSrc();
        }

        let divTabHeaderText = document.createElement("div");
        divTabHeader.appendChild(divTabHeaderText);
        divTabHeaderText.className = "NobucaTabHeaderText";
        divTabHeaderText.innerHTML = this.getModel().getText();

        divTabHeader.divTabHeaderText = divTabHeaderText;

        let divTabHeaderCloseButton = document.createElement("div");
        divTabHeader.appendChild(divTabHeaderCloseButton);
        divTabHeaderCloseButton.className = "NobucaTabHeaderCloseButton";

        divTabHeader.divTabHeaderCloseButton = divTabHeaderCloseButton;

        divTabHeaderCloseButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.getModel().getCloseClickedEventEmitter().emit(this.getModel());
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

 
}