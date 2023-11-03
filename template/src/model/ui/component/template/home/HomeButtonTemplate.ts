// @ts-ignore
import { config } from "@/config/Config";
import { ButtonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { HomeContent } from "@/model/application/content/HomeContent";
import { HomeButtonMouseDownEvent } from "@/model/domain/event/home/HomeButtonMouseDownEvent";
import { HomeButtonMouseUpEvent } from "@/model/domain/event/home/HomeButtonMouseUpEvent";
import type { Event } from "@next2d/events";
import { MouseEvent } from "@next2d/events";

/**
 * @class
 */
export class HomeButtonTemplate
{
    private _$homeButtonMouseDownEvent: HomeButtonMouseDownEvent;
    private _$homeButtonMouseUpEvent: HomeButtonMouseUpEvent;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {HomeButtonMouseDownEvent}
         * @private
         */
        this._$homeButtonMouseDownEvent = new HomeButtonMouseDownEvent();

        /**
         * @type {HomeButtonMouseUpEvent}
         * @private
         */
        this._$homeButtonMouseUpEvent = new HomeButtonMouseUpEvent();
    }

    /**
     * @return {HomeContent}
     * @method
     * @public
     */
    factory (): HomeContent
    {
        const homeContent: HomeContent = ButtonComponent.factory(new HomeContent());

        homeContent.x = config.stage.width  / 2 - 4;
        homeContent.y = config.stage.height / 2;

        homeContent.scaleX = 2;
        homeContent.scaleY = 2;

        homeContent.addEventListener(MouseEvent.MOUSE_DOWN, (event: Event) =>
        {
            this._$homeButtonMouseDownEvent.execute(event);
        });

        homeContent.addEventListener(MouseEvent.MOUSE_UP, (event: Event) =>
        {
            this._$homeButtonMouseUpEvent.execute(event);
        });

        return homeContent;
    }
}