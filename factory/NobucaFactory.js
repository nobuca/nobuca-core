import NobucaAppView from "../app/NobucaAppView.js";
import NobucaMenubarView from "../menubar/NobucaMenubarView.js";
import NobucaPanelView from "../panel/NobucaPanelView.js";
import NobucaPanelDynamicVerticalDividerView from "../panel/NobucaPanelDynamicVerticalDividerView.js";
import NobucaPanelDynamicHorizontalDividerView from "../panel/NobucaPanelDynamicHorizontalDividerView.js";
import NobucaTreeView from "../tree/NobucaTreeView.js";
import NobucaTabsView from "../tabs/NobucaTabsView.js";
import NobucaFieldsetView from "../fieldset/NobucaFieldsetView.js";
import NobucaButtonView from "../button/NobucaButtonView.js";
import NobucaLabelView from "../label/NobucaLabelView.js";
import NobucaLinkView from "../link/NobucaLinkView.js";
import NobucaSelectView from "../select/NobucaSelectView.js";
import NobucaTextView from "../text/NobucaTextView.js";
import NobucaTextAreaView from "../text-area/NobucaTextAreaView.js";
import NobucaHtmlView from "../html/NobucaHtmlView.js";

export default class NobucaFactory {

    static registeredViewConstructors = new Map();

    static registerViewConstructorForModelClassName(
        modelClassName,
        viewConstructor
    ) {
        NobucaFactory.registeredViewConstructors.set(modelClassName, viewConstructor);
    }

    static registerDefaultViewConstructors() {
        NobucaFactory.registerViewConstructorForModelClassName("NobucaAppModel",
            function(model) { return new NobucaAppView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaMenubarModel",
            function(model) { return new NobucaMenubarView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaPanelModel",
            function(model) { return new NobucaPanelView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTreeModel",
            function(model) { return new NobucaTreeView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaDynamicPanelVerticalDividerModel",
            function(model) { return new NobucaPanelDynamicVerticalDividerView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaPanelDynamicHorizontalDividerModel",
            function(model) { return new NobucaPanelDynamicHorizontalDividerView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaPanelDynamicHorizontalDividerModel",
            function(model) { return new NobucaPanelDynamicHorizontalDividerView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTabsModel",
            function(model) { return new NobucaTabsView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaFieldsetModel",
            function(model) { return new NobucaFieldsetView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTabsModel",
            function(model) { return new NobucaTabsView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaButtonModel",
            function(model) { return new NobucaButtonView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaLabelModel",
            function(model) { return new NobucaLabelView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaLinkModel",
            function(model) { return new NobucaLinkView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaSelectModel",
            function(model) { return new NobucaSelectView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTextModel",
            function(model) { return new NobucaTextView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaTextAreaModel",
            function(model) { return new NobucaTextAreaView(model); });
        NobucaFactory.registerViewConstructorForModelClassName("NobucaHtmlModel",
            function(model) { return new NobucaHtmlView(model); });
    }

    static createNewViewForModel(model) {
        if (model.getClassName == null) {
            console.log(
                "Imposible instanciar view para un model que no tiene método getClassName."
            );
            return null;
        }

        let viewConstructor = NobucaFactory.registeredViewConstructors.get(model.getClassName());
        if (viewConstructor != null) {
            let view = new viewConstructor(model);
            return view;
        }

        console.log(
            "Imposible instanciar view para un model con getClassName [" +
            model.getClassName() +
            "]."
        );
        return null;
    }


}