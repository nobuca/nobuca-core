import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTreeNodeExpandCollapseButtonView extends NobucaComponentView {
F
    createNativeElement() {
        let img = document.createElement("img");
        img.className = "NobucaTreeNodeExpandCollapseButton";

        img.addEventListener('click', event => {
            if (this.getModel().getExpanded()) {
                this.getModel().collapse();
            } else {
                this.getModel().expand();
            }
        });

        this.setNativeElement(img);

        this.updateView();
    }

    updateView() {
        if (this.getModel().getNodes().length === 0) {
            this.getNativeElement().className = 'NobucaTreeNodeExpandCollapseButton withoutChildren';
        } else {
            this.getNativeElement().className = 'NobucaTreeNodeExpandCollapseButton withChildren';
            if (this.getModel().getExpanded()) {
                this.getNativeElement().src = this.getModel().getTree().getCollapseButtonIconSrc();
            } else {
                this.getNativeElement().src = this.getModel().getTree().getExpandButtonIconSrc();
            }
        }
    }

    listenModel() {
        this.getModel().getExpandEventEmitter().subscribe(() => {
            this.updateView();
        });

        this.getModel().getCollapseEventEmitter().subscribe(() => {
            this.updateView();
        });

        this.getModel().getAddNodeEventEmitter().subscribe(() => {
            this.updateView();
        });
    }

}