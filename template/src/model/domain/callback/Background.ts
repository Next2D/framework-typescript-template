import { config } from "@/config/Config";
import { app } from "@next2d/framework";
import { Shape, stage } from "@next2d/display";
import { Event } from "@next2d/events";
import { execute as backgroundDrawService } from "./Background/service/BackgroundDrawService";
import { execute as backgroundChangeScaleService } from "./Background/service/BackgroundChangeScaleService";

/**
 * @description グラデーション背景
 *              Gradient background
 *
 * @class
 */
export class Background
{
    /**
     * @type {Shape}
     * @public
     */
    public readonly shape: Shape;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        this.shape = new Shape();
        stage.addEventListener(Event.RESIZE, (): void =>
        {
            backgroundDrawService(this);
            backgroundChangeScaleService(this);
        });
    }

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

        const shape = this.shape;
        if (config.stage.width !== shape.width
            || config.stage.height !== shape.height
        ) {
            backgroundDrawService(this);
            backgroundChangeScaleService(this);
        }

        /**
         * 一番下のレイヤーに登録
         * Register at the bottom layer
         **/
        view.addChildAt(shape, 0);
    }
}