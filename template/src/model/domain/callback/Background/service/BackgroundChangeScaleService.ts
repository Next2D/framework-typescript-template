import type { Background } from "../../Background";
import { config } from "@/config/Config";
import { stage } from "@next2d/display";

/**
 * @description 表示範囲に合わせてShapeを拡大・縮小
 *              Scale the shape to fit the display area
 *
 * @param  {Background} background
 * @return {void}
 * @method
 * @protected
 */
export const execute = (background: Background): void => {
    const width  = config.stage.width;
    const height = config.stage.height;
    const scale  = stage.rendererScale;

    const shape = background.shape;
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