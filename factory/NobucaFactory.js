import NobucaMenubarView from "../menubar/NobucaMenubarView.js";
import NobucaPanelView from "../panel/NobucaPanelView.js";
import NobucaPanelSplitLeftRightView from "../split/NobucaPanelSplitLeftRightView.js";
import NobucaPanelSplitTopBottomView from "../split/NobucaPanelSplitTopBottomView.js";
import NobucaTreeView from "../tree/NobucaTreeView.js";
import NobucaTreeNodeIconView from "../tree/NobucaTreeNodeIconView.js";
import NobucaTreeNodeTextView from "../tree/NobucaTreeNodeTextView.js";
import NobucaTabsHeaderView from "../tabs/NobucaTabsHeaderView.js";
import NobucaFieldsetView from "../fieldset/NobucaFieldsetView.js";
import NobucaButtonView from "../button/NobucaButtonView.js";
import NobucaButtonbarView from "../buttonbar/NobucaButtonbarView.js";
import NobucaLabelView from "../label/NobucaLabelView.js";
import NobucaCheckboxView from "../checkbox/NobucaCheckboxView.js";
import NobucaLinkView from "../link/NobucaLinkView.js";
import NobucaSelectView from "../select/NobucaSelectView.js";
import NobucaTextView from "../text/NobucaTextView.js";
import NobucaTextAreaView from "../text-area/NobucaTextAreaView.js";
import NobucaHtmlView from "../html/NobucaHtmlView.js";
import NobucaImageView from "../image/NobucaImageView.js";
import NobucaAccordionView from "../accordion/NobucaAccordionView.js";
import NobucaPopoverView from "../popover/NobucaPopoverView.js";
import NobucaWhitespaceView from "../whitespace/NobucaWhitespaceView.js";

export default class NobucaFactory {

    static registeredViewConstructors = new Map();

    static registerViewConstructorForModelClassName(
        modelClassName,
        viewConstructor
    ) {
        NobucaFactory.registeredViewConstructors.set(modelClassName, viewConstructor);
    }

    static registerDefaultViewConstructors() {
        NobucaFactory.registerViewConstructorForModelClassName("NobucaMenubarModel",
            function (model) { return new NobucaMenubarView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaPanelModel",
            function (model) { return new NobucaPanelView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaPanelSplitLeftRightModel",
            function (model) { return new NobucaPanelSplitLeftRightView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaPanelSplitTopBottomModel",
            function (model) { return new NobucaPanelSplitTopBottomView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTreeModel",
            function (model) { return new NobucaTreeView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTreeNodeIconModel",
            function (model) { return new NobucaTreeNodeIconView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTreeNodeTextModel",
            function (model) { return new NobucaTreeNodeTextView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaFieldsetModel",
            function (model) { return new NobucaFieldsetView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTabsHeaderModel",
            function (model) { return new NobucaTabsHeaderView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaButtonModel",
            function (model) { return new NobucaButtonView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaButtonbarModel",
            function (model) { return new NobucaButtonbarView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaLabelModel",
            function (model) { return new NobucaLabelView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaWhitespaceModel",
            function (model) { return new NobucaWhitespaceView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaCheckboxModel",
            function (model) { return new NobucaCheckboxView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaLinkModel",
            function (model) { return new NobucaLinkView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaSelectModel",
            function (model) { return new NobucaSelectView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaImageModel",
            function (model) { return new NobucaImageView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTextModel",
            function (model) { return new NobucaTextView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTextAreaModel",
            function (model) { return new NobucaTextAreaView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaAccordionModel",
            function (model) { return new NobucaAccordionView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaHtmlModel",
            function (model) { return new NobucaHtmlView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaPopoverModel",
            function (model) { return new NobucaPopoverView(model); });
        return null;
    }

    static createNewViewForModel(model) {

        if (model == null) {
            throw "Unable to instantiate a view for a model null.";
        }

        if (model.getClassName == null) {
            throw "Unable to instantiate a view for a model without getClassName method."
        }

        let viewConstructor = NobucaFactory.registeredViewConstructors.get(model.getClassName());
        if (viewConstructor != null) {
            let view = new viewConstructor(model);
            if (view == null) {
                throw "Something gone wrong executing view constructor for model [" +
                model.getClassName() +
                "].";
            }
            model.setView(view);
            return view;
        }

        throw "Unable to instantiate a view for a model with getClassName [" +
        model.getClassName() +
        "].";
    }
}