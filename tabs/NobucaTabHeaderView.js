import NobucaComponentView from '../component/NobucaComponentView.js';
import NobucaEventEmitter from '../event/NobucaEventEmitter.js';

export default class NobucaTabHeaderView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.deactivate();
    }

    startDragging() {
        console.log("startDragging");
        NobucaTabHeaderView.draggingTabHeaderView = this;
    }

    stopDragging() {
        console.log("stopDragging");
        if (NobucaTabHeaderView.visibleInsertPoint != null) {
            NobucaTabHeaderView.visibleInsertPoint.classList.remove("visible");
        }
        NobucaTabHeaderView.visibleInsertPoint = null;
        NobucaTabHeaderView.draggingTabHeaderView = null;
    }

    ifDraggingShowInsertPoint(divTabHeader, event) {
        if (NobucaTabHeaderView.visibleInsertPoint != null) {
            NobucaTabHeaderView.visibleInsertPoint.classList.remove("visible");
        }
        if (NobucaTabHeaderView.draggingTabHeaderView == null) return;
        var divTabHeaderLeft = this.getAbsoluteLeft(divTabHeader);
        var mouseX = event.x - divTabHeaderLeft;
        var tabHeaderWidth = divTabHeader.offsetWidth;
        if (mouseX < tabHeaderWidth / 2) {
            NobucaTabHeaderView.visibleInsertPoint = divTabHeader.divTabHeaderInsertPointLeft;
            NobucaTabHeaderView.visibleInsertPoint.classList.add("visible");
        } else {
            NobucaTabHeaderView.visibleInsertPoint = divTabHeader.divTabHeaderInsertPointRight;
            NobucaTabHeaderView.visibleInsertPoint.classList.add("visible");
        }
    }

    createNativeElement() {

        let divTabHeader = document.createElement("div");
        divTabHeader.className = "NobucaTabHeader";

        divTabHeader.addEventListener('mouseup', (event) => {
            this.stopDragging();
            this.getModel().getClickedEventEmitter().emit();
        });

        divTabHeader.addEventListener('mousedown', (event) => {
            this.startDragging();
        });

        divTabHeader.addEventListener('mousemove', (event) => {
            this.ifDraggingShowInsertPoint(divTabHeader, event);
        });

        divTabHeader.addEventListener('dblclick', (event) => {
            this.getModel().getDoubleClickedEventEmitter().emit();
        });

        divTabHeader.classList.add('inactive');

        let divTabHeaderInsertPointLeft = document.createElement("div");
        divTabHeaderInsertPointLeft.className = "NobucaTabHeaderInsertPointLeft";
        divTabHeader.appendChild(divTabHeaderInsertPointLeft);

        divTabHeader.divTabHeaderInsertPointLeft = divTabHeaderInsertPointLeft;

        if (this.getModel().getImageSrc() != null) {
            let imgTabHeaderIcon = document.createElement("img");
            divTabHeader.appendChild(imgTabHeaderIcon);
            imgTabHeaderIcon.className = "NobucaTabHeaderIcon";
            imgTabHeaderIcon.src = this.getModel().getImageSrc();
            imgTabHeaderIcon.draggable = false;
        }

        let divTabHeaderText = document.createElement("div");
        divTabHeader.appendChild(divTabHeaderText);
        divTabHeaderText.className = "NobucaTabHeaderText";
        divTabHeaderText.innerHTML = this.getModel().getText();

        divTabHeader.divTabHeaderText = divTabHeaderText;

        let divTabHeaderCloseButton = document.createElement("div");
        divTabHeader.appendChild(divTabHeaderCloseButton);
        divTabHeaderCloseButton.className = "NobucaTabHeaderCloseButton";
        divTabHeaderCloseButton.draggable = false;

        divTabHeader.divTabHeaderCloseButton = divTabHeaderCloseButton;

        divTabHeaderCloseButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.getModel().getCloseClickedEventEmitter().emit(this.getModel());
        });

        divTabHeaderCloseButton.style.display = "none";
        if (this.getModel().getCloseable()) {
            divTabHeaderCloseButton.style.display = "";
        }

        let divTabHeaderInsertPointRight = document.createElement("div");
        divTabHeaderInsertPointRight.className = "NobucaTabHeaderInsertPointRight";
        divTabHeader.appendChild(divTabHeaderInsertPointRight);

        divTabHeader.divTabHeaderInsertPointRight = divTabHeaderInsertPointRight;

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

document.addEventListener("mousemove", event => {
    if ((event.buttons & 1) == 0) {
        if (NobucaTabHeaderView.draggingTabHeaderView != null) {
            NobucaTabHeaderView.draggingTabHeaderView.stopDragging();
        }
    }
});

document.addEventListener("keydown", event => {
    if(event.key == "Escape") {
        if (NobucaTabHeaderView.draggingTabHeaderView != null) {
            NobucaTabHeaderView.draggingTabHeaderView.stopDragging();
        }
    }
});
