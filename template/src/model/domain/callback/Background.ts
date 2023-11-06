// @ts-ignore
import { config } from "@/config/Config";
import { context } from "@next2d/framework";
import { Shape, Stage } from "@next2d/display";
import { Event } from "@next2d/events";
import { Matrix } from "@next2d/geom";
import { $currentPlayer } from "@next2d/util";
import type { Player } from "@next2d/core";
import type { View } from "@next2d/framework";

const shape: Shape = new Shape();
shape.name = "background";

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
    const width: number  = config.stage.width;
    const height: number = config.stage.height;
    const player: Player = $currentPlayer();

    const tx: number = player.x;
    if (tx) {
        const scaleX: number = player.scaleX;
        shape.scaleX = (width + tx * 2 / scaleX) / width;
        shape.x = -tx / scaleX;
    }

    const ty: number = player.y;
    if (ty) {
        const scaleY: number = player.scaleY;
        shape.scaleY = (height + ty * 2 / scaleY) / height;
        shape.y = -ty / scaleY;
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
        const view: View | null = context.view;
        if (!view) {
            return ;
        }

        const stage: Stage | null = context.root.stage;
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