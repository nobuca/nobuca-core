import NobucaPanelDynamicHorizontalDividerView from "./NobucaPanelDynamicHorizontalDividerView.js";
import NobucaPanelDynamicVerticalDividerView from "./NobucaPanelDynamicVerticalDividerView.js";
import NobucaPanelStaticHorizontalDividerView from "./NobucaPanelStaticHorizontalDividerView.js";
import NobucaPanelStaticVerticalDividerView from "./NobucaPanelStaticVerticalDividerView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaPanelResizableView {
    constructor(panelModel) {
        this.panelModel = panelModel;
        this.nativeElement = this.createDiv();
        this.headerView = null;
        this.childViews = [];
        this.fixedWidth = null;
        this.fixedHeight = null;

        this.updatePositionFromModel();
        this.updateSizeFromModel();

        this.listenPanelModelEvents();
    }

    getPanelModel() {
        return this.panelModel;
    }

    getNativeElement() {
        return this.nativeElement;
    }

    resizeToWindow() {
        this.getPanelModel().getPosition().setTopAndLeft(0, 0);
        this.getPanelModel()
            .getSize()
            .setWidthAndHeight(window.innerWidth, window.innerHeight);
    }

    createDiv() {
        let div = document.createElement("div");
        div.className = "NobucaPanel";
        if (this.getPanelModel().getId() != null) {
            div.id = this.getPanelModel().getId();
        }
        return div;
    }

    makeRootPanel() {
        this.rootPanel = true;
    }

    setHeader(headerView) {
        this.headerView = headerView;
        if (this.nativeElement.firstChild != null) {
            this.nativeElement.insertBefore(
                this.headerView.nativeElement,
                this.nativeElement.firstChild
            );
        } else {
            this.nativeElement.appendChild(this.headerView.nativeElement);
        }
    }

    getHeader() {
        return this.headerView;
    }

    addChild(childView) {
        this.nativeElement.appendChild(childView.nativeElement);
        this.childViews.push(childView);
        childView.parentView = this;
    }

    removeChild(childView) {
        let index = this.childViews.indexOf(childView);
        this.nativeElement.removeChild(childView.nativeElement);
        this.childViews.splice(index, 1);
    }

    removeChilds() {
        while (this.childViews.length > 0) {
            this.removeChild(this.childViews[0]);
        }
    }

    getChildIndex(childView) {
        return this.childViews.indexOf(childView);
    }

    getChildAtIndex(index) {
        return this.childViews[index];
    }

    addStaticDivider() {
        if (this.direction === "vertical") {
            let dividerView = new NobucaPanelStaticVerticalDividerView();
            this.addChild(dividerView);
            return dividerView;
        } else {
            let dividerView = new NobucaPanelStaticHorizontalDividerView();
            this.addChild(dividerView);
            return dividerView;
        }
    }

    setPosition(top, left) {
        this.nativeElement.style.top = top + "px";
        this.nativeElement.style.left = left + "px";
    }

    setSize(width, height) {
        this.nativeElement.style.width = width + "px";
        this.nativeElement.style.height = height + "px";
    }

    getTop() {
        return this.nativeElement.offsetTop;
    }

    getLeft() {
        return this.nativeElement.offsetLeft;
    }

    getHeight() {
        return this.nativeElement.offsetHeight;
    }

    getWidth() {
        return this.nativeElement.offsetWidth;
    }

    updatePositionFromModel() {
        this.setPosition(
            this.getPanelModel().getPosition().getTop(),
            this.getPanelModel().getPosition().getLeft()
        );
    }

    updateSizeFromModel() {
        this.setSize(
            this.getPanelModel().getSize().getWidth(),
            this.getPanelModel().getSize().getHeight()
        );
    }

    listenPanelModelEvents() {
        this.getPanelModel()
            .getAddChildEventEmitter()
            .subscribe((childModel) => {
                let childView = NobucaFactory.createNewViewForModel(childModel);
                this.addChild(childView);
            });

        this.getPanelModel()
            .getSize()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updateSizeFromModel();
            });

        this.getPanelModel()
            .getPosition()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.updatePositionFromModel();
            });
    }
}