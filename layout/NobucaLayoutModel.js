export default class NobucaLayoutModel {


    setDirectionRow() {
        this.direction = "row";
        return this;
    }

    setDirectionColumn() {
        this.direction = "column";
        return this;
    }

    getDirectionRow() {
        return this.direction == "row";
    }

    getDirectionColumn() {
        return this.direction == "column";
    }

    setAlignContentsTop() {
        this.alignContents = "top";
        return this;
    }

    getAlignContentsTop() {
        return this.alignContents == "top";
    }
    
    setAlignContentsBottom() {
        this.alignContents = "bottom";
        return this;
    }

    getAlignContentsBottom() {
        return this.alignContents == "bottom";
    }

    setAlignContentsCenter() {
        this.alignContents = "center";
        return this;
    }

    getAlignContentsCenter() {
        return this.alignContents == "center";
    }

    setJustifyContentsLeft() {
        this.justifyContents = "left";
        return this;
    }

    getJustifyContentsLeft() {
        return this.justifyContents == "left";
    }

    setJustifyContentsRight() {
        this.justifyContents = "right";
        return this;
    }

    getJustifyContentsRight() {
        return this.justifyContents == "right";
    }

    setJustifyContentsCenter() {
        this.justifyContents = "center";
        return this;
    }

    getJustifyContentsCenter() {
        return this.justifyContents == "center";
    }

    setGrow(grow) {
        this.grow = grow;
        return this;
    }

    getGrow() {
        return this.grow;
    }

    setTop(top) {
        this.top = top;
        return this;
    }

    getTop() {
        return this.top;
    }

    setBottom(bottom) {
        this.bottom = bottom;
        return this;
    }

    getBottom() {
        return this.bottom;
    }

    setRight(right) {
        this.right = right;
        return this;
    }

    getRight() {
        return this.right;
    }

    setLeft(left) {
        this.left = left;
        return this;
    }

    getLeft() {
        return this.left;
    }

    setWidth(width) {
        this.width = width;
        return this;
    }

    getWidth() {
        return this.width;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    getHeight() {
        return this.height;
    }

    setPadding(padding) {
        this.padding = padding;
        return this;
    }

    getPadding() {
        return this.padding;
    }

    setPaddingTop(paddingTop) {
        this.paddingTop = paddingTop;
        return this;
    }

    getPaddingTop() {
        return this.paddingTop;
    }

    setPaddingBottom(paddingBottom) {
        this.paddingBottom = paddingBottom;
        return this;
    }

    getPaddingBottom() {
        return this.paddingBottom;
    }

    setPaddingLeft(paddingLeft) {
        this.paddingLeft = paddingLeft;
        return this;
    }

    getPaddingLeft() {
        return this.paddingLeft;
    }

    setPaddingRight(paddingRight) {
        this.paddingRight = paddingRight;
        return this;
    }

    getPaddingRight() {
        return this.paddingRight;
    }

    setToneDown(toneDown) {
        this.toneDown = toneDown;
        return this;
    }

    getToneDown() {
        return this.toneDown;
    }

    setPositionAbsolute() {
        this.position = "absolute";
        return this;
    }

    getPositionAbsolute() {
        return this.position === "absolute";
    }
}