import NobucaPanelView from "../panel/NobucaPanelView.js";

export default class NobucaPopoverView extends NobucaPanelView {

    static activePopover;

    constructor(model) {
        super(model);

        if (NobucaPopoverView.activePopover != null) {
            NobucaPopoverView.activePopover.destroy();
            NobucaPopoverView.activePopover = null;
        }

        this.createDestroyedEventEmitter();

        document.body.appendChild(this.getNativeElement());

        NobucaPopoverView.activePopover = this;
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

    destroy() {
        this.getNativeElement().parentNode.removeChild(this.getNativeElement());
        this.getDestroyedEventEmitter().emit();
        this.getDestroyedEventEmitter().clearSubscriptions();
    }
}

document.addEventListener("mousedown", event => {
    if (NobucaPopoverView.activePopover == null) return;
    NobucaPopoverView.activePopover.destroy();
    NobucaPopoverView.activePopover = null;
});

document.addEventListener("wheel", event => {
    if (NobucaPopoverView.activePopover == null) return;
    NobucaPopoverView.activePopover.destroy();
    NobucaPopoverView.activePopover = null;
});

document.addEventListener("keydown", event => {
    if (NobucaPopoverView.activePopover == null) return;
    NobucaPopoverView.activePopover.destroy();
    NobucaPopoverView.activePopover = null;
});