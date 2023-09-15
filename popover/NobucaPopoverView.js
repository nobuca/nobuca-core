import NobucaPanelView from "../panel/NobucaPanelView.js";

export default class NobucaPopoverView extends NobucaPanelView {

    constructor(model) {
        super(model);
        this.createDestroyedEventEmitter();

        document.body.appendChild(this.getNativeElement());

        this.getNativeElement().addEventListener("mouseout", () => {
            this.startMouseOutTimeout();
        });

        this.getNativeElement().addEventListener("mouseover", () => {
            this.cancelMouseOutTimeout();
        });
    }

    startMouseOutTimeout() {
        this.cancelMouseOutTimeout();
        this.mouseOutTimeout = setTimeout(() => { this.destroyPopover() }, 1000);
    }

    cancelMouseOutTimeout() {
        if (this.mouseOutTimeout == null) return;
        clearTimeout(this.mouseOutTimeout);
        this.mouseOutTimeout = null;
    }

    getClassName() {
        return "NobucaPopover";
    }

    createDestroyedEventEmitter() {
        this.destroyedEventEmitter = this.createEventEmitter();
    }

    getDestroyedEventEmitter() {
        return this.destroyedEventEmitter;
    }

    destroyPopover() {
        this.getNativeElement().parentNode.removeChild(this.getNativeElement());
        this.getDestroyedEventEmitter().emit();
    }
}
