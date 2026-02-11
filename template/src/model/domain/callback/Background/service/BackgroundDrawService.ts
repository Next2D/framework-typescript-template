import type { Background } from "../../Background";
import { config } from "@/config/Config";
import { Matrix } from "@next2d/geom";

/**
 * @description 背景のグラデーション描画を実行
 *              Execute background gradient drawing
 *
 * @param  {Background} background
 * @return {void}
 * @method
 * @protected
 */
export const execute = (background: Background): void => {
    const width  = config.stage.width;
    const height = config.stage.height;

    const matrix = new Matrix();
    matrix.createGradientBox(height, width, Math.PI / 2, 0, 0);

    background
        .shape
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