// @ts-ignore
import { config } from "@/config/Config";
import { ButtonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { HomeContent } from "@/model/application/content/HomeContent";
import { execute as homeButtonMouseDownEvent } from "@/model/domain/event/home/HomeButtonMouseDownEvent";
import { execute as homeButtonMouseUpEvent } from "@/model/domain/event/home/HomeButtonMouseUpEvent";
import { MouseEvent } from "@next2d/events";

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
    const homeContent: HomeContent = ButtonComponent.factory(new HomeContent());

    homeContent.x = config.stage.width  / 2 - 4;
    homeContent.y = config.stage.height / 2;

    homeContent.scaleX = 2;
    homeContent.scaleY = 2;

    homeContent.addEventListener(MouseEvent.MOUSE_DOWN, homeButtonMouseDownEvent);
    homeContent.addEventListener(MouseEvent.MOUSE_UP, homeButtonMouseUpEvent);

    return homeContent;
};