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

    setAlignContentsCenter() {
        this.alignContent = "center";
    }

    getAlignContentsCenter() {
        return this.alignContent == "center";
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

    setGrow() {
        this.grow = true;
    }

    getGrow() {
        return this.grow;
    }

}