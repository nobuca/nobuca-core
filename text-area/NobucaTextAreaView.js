import NobucaComponentView from "../component/NobucaComponentView.js";

export default class NobucaTextView extends NobucaComponentView{

    createNativeElement() {
        let textarea = document.createElement('textarea');
        textarea.className = 'NobucaTextArea';

        textarea.addEventListener('focus', event => {
            this.focus();
        });

        textarea.addEventListener('input', event => {
            this.getModel().setValue(textarea.value);
        });

        this.setNativeElement(textarea);
    }

    getValue() {
        return this.getNativeElement().value;
    }

    setValue(value) {
        this.getNativeElement().value = value;
    }

    focus() {
        this.getNativeElement().focus();
    }

    updateView() {
        if (this.getModel().getEnabled()) {
            this.getNativeElement().removeAttribute('readonly');
            this.getNativeElement().classList.remove('disabled');
            this.getNativeElement().classList.add('enabled');
        } else {
            this.getNativeElement().setAttribute('readonly', true);
            this.getNativeElement().classList.remove('enabled');
            this.getNativeElement().classList.add('disabled');
        }
    }

    disable() {
        this.getNativeElement().setAttribute('readonly', '');
    }

    listenModel() {

        this.getModel()
            .getFocusEventEmitter()
            .subscribe(() => {
                this.getNativeElement().focus();
            });

        this.getModel()
            .getValueChangeEventEmitter()
            .subscribe(value => {
                this.setValue(value);
            });

        this.getModel()
            .getEnabledChangedEventEmitter()
            .subscribe(() => {
                this.updateView();
            });

        this.getModel()
            .getSelectEventEmitter()
            .subscribe(() => {
                this.getNativeElement().select();
            });
    }
}