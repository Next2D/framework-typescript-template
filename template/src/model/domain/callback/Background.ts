// @ts-ignore
import { config } from "@/config/Config";
import { context } from "@next2d/framework";
import { Shape } from "@next2d/display";
import { Event } from "@next2d/events";
import { Matrix } from "@next2d/geom";
import type { DisplayObjectImpl } from "@next2d/interface";
import type { View } from "@next2d/framework";

/**
 * @class
 */
export class Background
{
    /**
     * @type {Shape}
     * @default null
     * @static
     */
    static shape: Shape | null = null;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        if (!Background.shape) {

            const shape = new Shape();
            shape.name = "background";

            const width  = config.stage.width;
            const height = config.stage.height;

            const matrix = new Matrix();
            matrix.createGradientBox(width, height, Math.PI / 2);

            shape
                .graphics
                .beginGradientFill(
                    "linear",
                    ["#1461A0", "#ffffff"],
                    [0.6, 1],
                    [0, 255],
                    matrix
                )
                .drawRect(0, 0, width, height)
                .endFill();

            Background.shape = shape;
        }
    }

    /**
     * @return {void}
     * @method
     * @public
     */
    execute (): void
    {
        const stage = context.root.stage;
        if (stage && !stage.hasEventListener(Event.RESIZE)) {
            stage.addEventListener(Event.RESIZE, () =>
            {
                this._$createShape();
            });
        }

        this._$createShape();
    }

    /**
     * @return {void}
     * @method
     * @private
     */
    _$createShape (): void
    {
        const view: View | null = context.view;
        if (!view) {
            return ;
        }

        const root = context.root;
        const stage = root.stage;
        if (!stage) {
            return ;
        }

        const player = stage.player;
        if (!player) {
            return ;
        }

        const width: number  = config.stage.width;
        const height: number = config.stage.height;

        let shape: DisplayObjectImpl<Shape> | null = view.getChildByName("background");
        if (!shape) {
            shape = view.addChildAt(Background.shape, 0) as DisplayObjectImpl<Shape>;
        }

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
    }
}