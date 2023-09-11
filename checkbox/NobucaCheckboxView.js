import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaCheckboxView extends NobucaComponentView {

    createNativeElement() {

        let div = document.createElement("div");
        div.className = "NobucaCheckbox";

        div.addEventListener("click", () => {
            this.getModel().setChecked(!this.getModel().getChecked());
            this.updateView();
        });

        let divMark = document.createElement("div");
        divMark.className = "NobucaCheckboxMark";
        div.appendChild(divMark);

        this.setNativeElement(div);

        this.updateView();
    }

    updateView() {
        if (this.getModel().getChecked()) {
            this.getNativeElement().classList.add("checked");
        } else {
            this.getNativeElement().classList.remove("checked");
        }
    }

}