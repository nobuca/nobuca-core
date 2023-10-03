import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTreeNodeExpandCollapseButtonView extends NobucaComponentView {
F
    createNativeElement() {
        let div = document.createElement("div");
        div.className = "NobucaTreeNodeExpandCollapseButton";

        div.addEventListener('click', event => {
            if (this.getModel().getExpanded()) {
                this.getModel().collapse();
            } else {
                this.getModel().expand();
            }
        });

        this.setNativeElement(div);

        this.updateView();
    }

    updateView() {
        if (this.getModel().getNodes().length === 0) {
            this.getNativeElement().className = 'NobucaTreeNodeExpandCollapseButton withoutChildren';
        } else {
            this.getNativeElement().className = 'NobucaTreeNodeExpandCollapseButton withChildren';
            if (this.getModel().getExpanded()) {
                this.getNativeElement().classList.add("expanded");
                this.getNativeElement().classList.remove("collapsed");
                    //this.getNativeElement().src = this.getModel().getTree().getCollapseButtonIconSrc();
            } else {
                this.getNativeElement().classList.remove("expanded");
                this.getNativeElement().classList.add("collapsed");
                //this.getNativeElement().src = this.getModel().getTree().getExpandButtonIconSrc();
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