import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTextView extends NobucaComponentView {

    createNativeElement() {
        let input = document.createElement('input');
        input.className = 'NobucaText';
        input.type = 'text';
        if (this.getModel().getValue() != null) {
            input.value = this.getModel().getValue();
        }

        if (this.getModel().getPassword()) {
            input.type = 'password';
        }

        if (this.getModel().getFocus()) {
            setTimeout(() => {
                input.focus();
            });
        }

        input.addEventListener('focus', event => {
            this.focus();
        });

        input.addEventListener('input', event => {
            this.getModel().setValue(input.value);
        });

        this.setNativeElement(input);
        this.updateView();
    }

    getValue() {
        return this.nativeElement.value;
    }

    setValue(value) {
        this.nativeElement.value = value;
    }

    focus() {
        this.nativeElement.focus();
    }

    updateView() {
        if (this.getModel().getEnabled()) {
            this.nativeElement.removeAttribute('readonly');
            this.nativeElement.classList.remove('disabled');
            this.nativeElement.classList.add('enabled');
        } else {
            this.nativeElement.setAttribute('readonly', true);
            this.nativeElement.classList.remove('enabled');
            this.nativeElement.classList.add('disabled');
        }
    }

    disable() {
        this.nativeElement.setAttribute('readonly', '');
    }

    listenModel() {
        this.getModel()
            .getFocusEventEmitter()
            .subscribe(() => {
                this.nativeElement.focus();
            });

        this.getModel()
            .getValueChangedEventEmitter()
            .subscribe((value) => {
                this.setValue(value);
            });

        this.getModel()
            .getEnabledChangedEventEmitter()
            .subscribe(() => {
                this.updateView();
            });
    }
}