import NobucaComponentView from "../component/NobucaComponentView.js";
import NobucaFactory from "../factory/NobucaFactory.js";

export default class NobucaFieldsetView extends NobucaComponentView {

    constructor(fieldsetModel) {
        super(fieldsetModel);
        this.legend = this.createLegend();
    }

    createNativeElement() {
        let fieldset = document.createElement('fieldset');
        fieldset.className = 'NobucaFieldset';
        fieldset.style.flexGrow = 1;
        fieldset.style.flexDirection = 'column';
        this.setNativeElement(fieldset);
    }

    createLegend() {
        let legend = document.createElement('legend');
        this.nativeElement.appendChild(legend);
        legend.className = 'NobucaFieldsetLegend';
        if (this.getModel().getRadioName() != null && this.getModel().getRadioValue() != null) {
            let radio = document.createElement('input');
            legend.appendChild(radio);
            radio.className = 'NobucaFieldsetLegendRadio';
            radio.type = 'radio';
            radio.name = this.getModel().getRadioName();
            radio.value = this.getModel().getRadioValue();
            radio.checked = this.getModel().getRadioChecked();
            radio.addEventListener('change', () => {
                if (this.checked) {
                    this.getModel().checkRadio();
                } else {
                    this.getModel().uncheckRadio();
                }
            });
            this.radio = radio;
        }
        let divLegendText = document.createElement('div');
        legend.appendChild(divLegendText);
        divLegendText.className = 'NobucaFieldsetLegendText';
        divLegendText.innerHTML = this.getModel().getText();
        return legend;
    }

    addChild(childView) {
        this.nativeElement.appendChild(childView.getNativeElement());
    }

    checkRadio() {
        this.radio.checked = true;
    }

    uncheckRadio() {
        this.radio.checked = false;
    }

    addChild(view) {
        this.nativeElement.appendChild(view.getNativeElement());
    }

    listenModel() {

        this.getModel()
            .getChildAddedEventEmitter()
            .subscribe((childModel) => {
                console.log(
                    "Added child model [" + childModel + "] to fieldset model [" + this + "]"
                );
                let childView = NobucaFactory.createNewViewForModel(childModel);
                this.addChild(childView);
            });

        this.getModel()
            .getRadioCheckEventListener()
            .subscribe(() => {
                this.radio.checked = true;
            });

        this.getModel()
            .getRadioUncheckEventListener()
            .subscribe(() => {
                this.radio.checked = false;
            });
    }
}