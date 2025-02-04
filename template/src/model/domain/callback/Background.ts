import { config } from "@/config/Config";
import { app } from "@next2d/framework";
import { Shape, stage } from "@next2d/display";
import { Event } from "@next2d/events";
import { Matrix } from "@next2d/geom";

/**
 * @type {Shape}
 * @private
 */
const shape: Shape = new Shape();

/**
 * @description 背景のグラデーション描画をセット
 *              Set background gradient drawing
 *
 * @return {void}
 * @method
 * @private
 */
const drawGradient = (): void =>
{
    const width: number  = config.stage.width;
    const height: number = config.stage.height;

    const matrix: Matrix = new Matrix();
    matrix.createGradientBox(width, height, Math.PI / 2);

    shape
        .graphics
        .clear()
        .beginGradientFill(
            "linear",
            ["#1461A0", "#ffffff"],
            [0.6, 1],
            [0, 255],
            matrix
        )
        .drawRect(0, 0, width, height)
        .endFill();
};

/**
 * @description 表示範囲に合わせてShapeを拡大・縮小
 *              Scale the shape to fit the display area
 *
 * @return {void}
 * @method
 * @private
 */
const changeScale = (): void =>
{
    const width  = config.stage.width;
    const height = config.stage.height;
    const scale  = stage.rendererScale;

    const tx = (stage.rendererWidth  - stage.stageWidth * scale) / 2;
    if (tx) {
        shape.scaleX = (width + tx * 2 / scale) / width;
        shape.x = -tx / scale;
    }

    const ty = (stage.rendererHeight - stage.stageHeight * scale) / 2;
    if (ty) {
        shape.scaleY = (height + ty * 2 / scale) / height;
        shape.y = -ty / scale;
    }
};

/**
 * @class
 */
export class Background
{
    /**
     * @description 背景のShapeを表示されるviewにセット
     *              Set the background shape to the view to be displayed
     *
     * @return {void}
     * @method
     * @public
     */
    execute (): void
    {
        const context = app.getContext();
        const view = context.view;
        if (!view) {
            return ;
        }

        if (stage && !stage.hasEventListener(Event.RESIZE)) {
            stage.addEventListener(Event.RESIZE, () =>
            {
                changeScale();
            });
        }

        if (config.stage.width !== shape.width) {
            drawGradient();
            changeScale();
        }

        view.addChildAt(shape, 0);
    }
}