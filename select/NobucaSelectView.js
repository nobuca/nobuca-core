import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaSelectView extends NobucaComponentView {

    createNativeElement() {
        let div = document.createElement('div');
        div.className = 'NobucaSelect';
        this.setNativeElement(div);
        this.createInput();
        this.createDropDownButton();
        this.createOptions();
        this.updateView();
    }

    setExpanded(expanded) {
        this.expanded = expanded;
    }

    getExpanded() {
        return this.expanded;
    }

    createInput() {
        let divInput = document.createElement('input');
        this.getNativeElement().appendChild(divInput);
        divInput.className = 'NobucaSelectInput';
        divInput.type = "text";

        divInput.addEventListener('focus', event => {
            this.getModel().getFocusEventEmitter().emit(this);
        });

        divInput.addEventListener('change', event => {
            this.getModel().setValue(this.getValue());
        });

        this.divInput = divInput;
    }

    getDivInput() {
        return this.divInput;
    }

    createDropDownButton() {
        let divButton = document.createElement('div');
        this.getNativeElement().appendChild(divButton);
        divButton.className = 'NobucaSelectButton';
        divButton.addEventListener("mousedown", () => {
            if (!this.getExpanded())
                this.showOptions();
            else
                this.hideOptions();
        });
    }

    createOptions() {
        this.divOptions = document.createElement('div');
        this.getNativeElement().appendChild(this.divOptions);
        this.divOptions.className = 'NobucaSelectOptions';
    }

    getDivOptions() {
        return this.divOptions;
    }

    showOptions() {
        this.setExpanded(true);
        this.getNativeElement().classList.add("expanded");
        this.getDivOptions().style.minHeight = this.getNativeElement().offsetHeight + "px";
        this.getDivOptions().style.minWidth = this.getNativeElement().offsetWidth + "px";
        this.getDivOptions().style.top = (this.getNativeElement().offsetTop + this.getNativeElement().offsetHeight) + "px";
        this.getDivOptions().style.left = (this.getNativeElement().offsetLeft) + "px";
        NobucaSelectView.currentExpandedSelectView = this;
    }

    hideOptions() {
        this.setExpanded(false);
        this.getNativeElement().classList.remove("expanded");
        NobucaSelectView.currentExpandedSelectView = null;
    }

    addOption(hiddenValue, visibleValue) {
        let option = document.createElement('option');
        this.getNativeElement().appendChild(option);
        option.hiddenValue = hiddenValue;
        option.innerHTML = visibleValue;
    }

    getValue() {
        return this.getNativeElement().value;
    }

    setValue(value) {
        this.getNativeElement().value = value;
    }

    focus() {
        this.nativeElement.focus();
    }

    enable() {
        this.enabled = true;
        this.updateView();
    }

    disable() {
        this.enabled = false;
        this.updateView();
    }

    updateView() {
        if (this.getModel().getEnabled()) {
            this.nativeElement.disabled = false;
            this.nativeElement.classList.remove('disabled');
            this.nativeElement.classList.add('enabled');
        } else {
            this.nativeElement.disabled = true;
            this.nativeElement.classList.remove('enabled');
            this.nativeElement.classList.add('disabled');
        }
    }

    listenModel() {

        this.getModel()
            .getValueChangedEventEmitter()
            .subscribe(() => {
                this.getDivInput().value = this.getModel().getValue();
            });

        this.getModel()
            .getAddOptionEventEmitter()
            .subscribe((optionModel) => {
                this.addOption(optionModel.getHiddenValue(), optionModel.getVisibleValue());
            });

        this.getModel()
            .getFocusEventEmitter()
            .subscribe(() => {
                this.nativeElement.focus();
            });

        this.getModel()
            .getEnabledChangedEventEmitter()
            .subscribe(() => {
                this.updateView();
            });
    }
}

document.addEventListener("mousedown", (event) => {
    if (NobucaSelectView.currentExpandedSelectView != null) {
        var descendant = event.target;
        var parent = NobucaSelectView.currentExpandedSelectView.getNativeElement();
        var clickedInsideSelect = NobucaSelectView.currentExpandedSelectView.isEqualOrDescendant(descendant, parent);
        if (!clickedInsideSelect) {
            NobucaSelectView.currentExpandedSelectView.hideOptions();
        }
    }
});