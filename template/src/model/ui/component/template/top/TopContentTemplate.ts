import { TopContent } from "@/model/application/content/TopContent";
import { execute as topContentEnterFrameEvent } from "@/model/domain/event/top/TopContentEnterFrameEvent";
import { Event } from "@next2d/events";
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

    topContent.addEventListener(Event.ENTER_FRAME, topContentEnterFrameEvent);

    return topContent;
}
