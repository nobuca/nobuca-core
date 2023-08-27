import NobucaPositionAndSizeModel from "../size-position/NobucaPositionAndSizeModel.js";
import NobucaUiEventEmitter from "../event/NobucaUiEventEmitter.js";

export default class NobucaPanelDynamicHorizontalDividerModel extends NobucaPositionAndSizeModel {
    static dragging = null;

    constructor() {
        super();
        this.getSize().setFixedWidth(6);
        this.leftPanel = null;
        this.rightPanel = null;
        this.draggedEventEmitter = new NobucaUiEventEmitter();
    }

    getClassName() {
        return "NobucaPanelDynamicHorizontalDividerModel";
    }

    getParent() {
        return this.parent;
    }

    setLeftPanel(leftPanel) {
        this.leftPanel = leftPanel;
    }

    getLeftPanel() {
        return this.leftPanel;
    }

    setRightPanel(rightPanel) {
        this.rightPanel = rightPanel;
    }

    getRightPanel() {
        return this.rightPanel;
    }

    setLeftAndRightPanels(leftPanel, rightPanel) {
        this.leftPanel = leftPanel;
        this.rightPanel = rightPanel;
    }

    getDraggedEventEmitter() {
        return this.draggedEventEmitter;
    }

    setLeftSideWidthPercentage(leftPanelWidthPercentage) {
        let totalWidth = this.getLeftPanelWidth() + this.getRightPanelWidth();
        let leftPanelWidth = leftPanelWidthPercentage * totalWidth;
        this.setLeftPanelWidth(leftPanelWidth);
        let dividerLeft = leftPanelWidth;
        this.getPosition().setLeft(dividerLeft);
        let rightPanelLeft = dividerLeft + this.getSize().getFixedWidth();
        let rightPanelWidth = this.getParentWidth() - rightPanelLeft;
        this.setRightPanelLeftAndWidth(rightPanelLeft, rightPanelWidth);
    }

    getLeftSideWidthPercentage() {
        let totalWidth = this.getLeftPanelWidth() + this.getRightPanelWidth();
        return this.getLeftPanelWidth() / totalWidth;
    }

    computeLeftAndRightPanels() {
        this.leftPanelView = this.computeLeftPanel();
        this.rightPanelView = this.computeRightPanel();
    }

    computeLeftPanel() {
        let index = this.parentView.getChildIndex(this);
        return this.parentView.getChildAtIndex(index - 1);
    }

    computeRightPanel() {
        let index = this.parentView.getChildIndex(this);
        return this.parentView.getChildAtIndex(index + 1);
    }

    getParentWidth() {
        return this.getParent().getSize().getWidth();
    }

    beginDrag(x, y) {
        this.dragStartX = x;
        this.dragStartLeft = this.getPosition().getLeft();
        this.dragStartLeftPanelOffsetWidth = this.getLeftPanelWidth();
        this.dragStartRightPanelOffsetLeft = this.getRightPanelLeft();
        this.dragStartRightPanelOffsetWidth = this.getRightPanelWidth();
    }

    drag(x, y) {
        let dx = this.dragStartX - x;
        this.setLeftPanelWidth(this.dragStartLeftPanelOffsetWidth - dx);
        this.setRightPanelLeftAndWidth(
            this.dragStartRightPanelOffsetLeft - dx,
            this.dragStartRightPanelOffsetWidth + dx
        );
        this.getPosition().setLeft(this.dragStartLeft - dx);
        this.getLeftPanel().getSize().fixWidth();
    }

    getLeftPanelWidth() {
        return this.getLeftPanel().getSize().getWidth();
    }

    getRightPanelLeft() {
        return this.getRightPanel().getPosition().getLeft();
    }

    getRightPanelWidth() {
        return this.getRightPanel().getSize().getWidth();
    }

    setLeftPanelWidth(leftPanelWidth) {
        this.getLeftPanel().getSize().setWidth(leftPanelWidth);
    }

    setRightPanelLeftAndWidth(rightPanelLeft, rightPanelWidth) {
        this.getRightPanel().getPosition().setLeft(rightPanelLeft);
        this.getRightPanel().getSize().setWidth(rightPanelWidth);
    }
}