export default class NobucaLayoutView {

    static applyLayout(componentView) {

        var nativeElement = componentView.getNativeElement();
        
        if(nativeElement==null) return;

        var layout = componentView.getModel().getLayout();

        if (layout.getDirectionRow()) {
            nativeElement.style.flexDirection = "row";
        } else if (layout.getDirectionColumn()) {
            nativeElement.style.flexDirection = "column";
        }

        if (layout.getJustifyContentsLeft()) {
            nativeElement.style.justifyContent = "left";
        } else if (layout.getJustifyContentsRight()) {
            nativeElement.style.justifyContent = "right";
        } else if (layout.getJustifyContentsCenter()) {
            nativeElement.style.justifyContent = "center";
        }

        if (layout.getAlignContentsCenter()) {
            nativeElement.style.alignItems = "center";
        } else if (layout.getAlignContentsTop()) {
            nativeElement.style.alignItems = "flex-start";
        } else if (layout.getAlignContentsBottom()) {
            nativeElement.style.alignItems = "flex-end";
        }

        if (layout.getGrow()) nativeElement.style.flexGrow = 1;

        if (layout.getTop() != null) nativeElement.style.top = layout.getTop();
        if (layout.getBottom() != null) nativeElement.style.bottom = layout.getBottom();
        if (layout.getRight() != null) nativeElement.style.right = layout.getRight();
        if (layout.getLeft() != null) nativeElement.style.left = layout.getLeft();

        if (layout.getWidth() != null) nativeElement.style.width = layout.getWidth();
        if (layout.getHeight() != null) nativeElement.style.height = layout.getHeight();

        if (layout.getPadding() != null) nativeElement.style.padding = layout.getPadding();
        if (layout.getPaddingTop() != null) nativeElement.style.paddingTop = layout.getPaddingTop();
        if (layout.getPaddingBottom() != null) nativeElement.style.paddingBottom = layout.getPaddingBottom();
        if (layout.getPaddingLeft() != null) nativeElement.style.paddingLeft = layout.getPaddingLeft();
        if (layout.getPaddingRight() != null) nativeElement.style.paddingRight = layout.getPaddingRight();

        if (layout.getToneDown()) nativeElement.style.opacity = .50;

        if (layout.getPositionAbsolute()) nativeElement.style.position = "absolute";
    }
}