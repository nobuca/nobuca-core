import NobucaEventEmitter from "../event/NobucaEventEmitter.js";
import NobucaPositionAndSizeModel from "../size-position/NobucaPositionAndSizeModel.js";
import NobucaPanelDynamicHorizontalDividerModel from "./NobucaPanelDynamicHorizontalDividerModel.js";
import NobucaPanelDynamicVerticalDividerModel from "./NobucaPanelDynamicVerticalDividerModel.js";

export default class NobucaPanelResizableModel extends NobucaPositionAndSizeModel {
    constructor(direction) {
        super();
        this.children = [];
        this.direction = "vertical";
        if (this.direction != null) {
            this.direction = direction;
        }
        this.addChildEventEmitter = new NobucaEventEmitter();
        this.listenSizeEvents();
    }

    getClassName() {
        return "NobucaPanelModel";
    }

    getChildren() {
        return this.children;
    }

    addChild(child) {
        this.children.push(child);
        child.parent = this;
        this.resizeChildren();
        this.getAddChildEventEmitter().emit(child);
    }

    getDirection() {
        return this.direction;
    }

    getAddChildEventEmitter() {
        return this.addChildEventEmitter;
    }

    getSizeChangeEventEmitter() {
        return this.sizeChangeEventEmitter;
    }

    addDynamicDivider() {
        if (this.getDirection() === "vertical") {
            let dividerModel = new NobucaPanelDynamicVerticalDividerModel();
            this.addChild(dividerModel);
            return dividerModel;
        } else {
            let dividerModel = new NobucaPanelDynamicHorizontalDividerModel();
            this.addChild(dividerModel);
            return dividerModel;
        }
    }

    listenSizeEvents() {
        this.getSize()
            .getChangeEventEmitter()
            .subscribe(() => {
                this.resizeChildren();
            });
    }

    resizeChildren() {
        if (this.getChildren().length === 0) return;
        if (this.getDirection() === "vertical") {
            this.resizeChildrenVertical();
        } else {
            this.resizeChildrenHorizontal();
        }
    }

    resizeChildrenVertical() {
        let childrenFixedHeight = this.computeChildrenFixedHeight();
        let childrenNotFixedHeight =
            this.getSize().getHeight() - childrenFixedHeight;
        let numberOfChildrenWithoutFixedHeight =
            this.countChildrenWithoutFixedHeight();
        let childHeight =
            childrenNotFixedHeight / numberOfChildrenWithoutFixedHeight;
        let top = 0;
        let left = 0;
        this.getChildren().forEach((child) => {
            if (child.getPosition != null) {
                child.getPosition().setTopAndLeft(top, left);
            }
            if (
                child.getSize == null ||
                child.getSize().getFixedHeight == null ||
                child.getSize().getFixedHeight() == null
            ) {
                if (child.getSize != null) {
                    child
                        .getSize()
                        .setWidthAndHeight(this.getSize().getWidth(), childHeight);
                }
                top += childHeight;
            } else {
                if (child.getSize != null) {
                    child
                        .getSize()
                        .setWidthAndHeight(
                            this.getSize().getWidth(),
                            child.getSize().getFixedHeight()
                        );
                }
                top += child.getSize().getFixedHeight();
            }
        });
    }

    resizeChildrenHorizontal() {
        let childWidth =
            (this.getSize().getWidth() - this.computeChildrenFixedWidth()) /
            this.countChildrenWithoutFixedWidth();
        let top = 0;
        let left = 0;
        this.getChildren().forEach((child) => {
            if (child.getPosition != null) {
                child.getPosition().setTopAndLeft(top, left);
            }
            if (
                child.getSize == null ||
                child.getSize().getFixedWidth == null ||
                child.getSize().getFixedWidth() == null
            ) {
                if (child.getSize != null) {
                    child
                        .getSize()
                        .setWidthAndHeight(childWidth, this.getSize().getHeight());
                }
                left += childWidth;
            } else {
                if (child.getSize != null) {
                    child
                        .getSize()
                        .setWidthAndHeight(
                            child.getSize().getFixedWidth(),
                            this.getSize().getHeight()
                        );
                }
                left += child.getSize().getFixedWidth();
            }
        });
    }

    countChildrenWithoutFixedHeight() {
        return this.getChildren().reduce((count, child) => {
            if (
                child.getSize == null ||
                child.getSize().getFixedHeight == null ||
                child.getSize().getFixedHeight() == null
            ) {
                return count + 1;
            } else {
                return count;
            }
        }, 0);
    }

    countChildrenWithoutFixedWidth() {
        return this.getChildren().reduce((count, child) => {
            if (
                child.getSize == null ||
                child.getSize().getFixedWidth == null ||
                child.getSize().getFixedWidth() == null
            ) {
                return count + 1;
            } else {
                return count;
            }
        }, 0);
    }

    computeChildrenFixedHeight() {
        return this.getChildren().reduce((fixedHeight, child) => {
            if (
                child.getSize != null &&
                child.getSize().getFixedHeight != null &&
                child.getSize().getFixedHeight() != null
            ) {
                return fixedHeight + child.getSize().getFixedHeight();
            } else {
                return fixedHeight;
            }
        }, 0);
    }

    computeChildrenFixedWidth() {
        return this.getChildren().reduce((fixedWidth, child) => {
            if (
                child.getSize != null &&
                child.getSize().getFixedWidth != null &&
                child.getSize().getFixedWidth() != null
            ) {
                return fixedWidth + child.getSize().getFixedWidth();
            } else {
                return fixedWidth;
            }
        }, 0);
    }
}