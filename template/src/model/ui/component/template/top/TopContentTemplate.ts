import { TopContent } from "@/model/application/content/TopContent";
import { config } from "@/config/Config";

/**
 * @description Topページのログ画像をAnimationToolのJSONから作成
 *              Top page log image created from AnimationTool JSON
 *
 * @return {TopContent}
 * @method
 * @public
 */
export const execute = (): TopContent =>
{
    /**
     * ロゴアニメーションをNoCodeToolのJSONから生成
     * Logo animation generated from NoCodeTool's JSON
     */
    const topContent = new TopContent();

    topContent.x = config.stage.width  / 2;
    topContent.y = config.stage.height / 2;

    return topContent;
};