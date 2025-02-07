import { config } from "@/config/Config";
import { execute as buttonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { HomeContent } from "@/model/application/content/HomeContent";
import { PointerEvent } from "@next2d/events";
import { execute as homeButtonPointerDownEvent } from "@/model/domain/event/home/HomeButtonPointerDownEvent";
import { execute as homeButtonPointerUpEvent } from "@/model/domain/event/home/HomeButtonPointerUpEvent";

/**
 * @description Home画面のキャラクターを生成
 *              Generate characters for the Home screen
 *
 * @return {HomeContent}
 * @method
 * @public
 */
export const execute = (): HomeContent =>
{
    const homeContent = buttonComponent(new HomeContent());

    homeContent.x = config.stage.width  / 2 - 4;
    homeContent.y = config.stage.height / 2;

    homeContent.scaleX = 2;
    homeContent.scaleY = 2;

    homeContent.addEventListener(PointerEvent.POINTER_DOWN, homeButtonPointerDownEvent);
    homeContent.addEventListener(PointerEvent.POINTER_UP, homeButtonPointerUpEvent);

    return homeContent;
};