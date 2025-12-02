import { ViewModel } from "@next2d/framework";
import type { PointerEvent, Event } from "@next2d/events";
import { execute as homeContentPointerDownService } from "@/model/application/home/service/HomeContentPointerDownService";
import { execute as homeContentPointerUpService } from "@/model/application/home/service/HomeContentPointerUpService";
import { execute as homeTextChangeService } from "@/model/application/home/service/HomeTextChangeService";

/**
 * @class
 * @extends {ViewModel}
 */
export class HomeViewModel extends ViewModel
{
    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        return void 0;
    }

    /**
     * @description ホームコンテンツのポインターダウン時の処理
     *              Handle when home content is pointer down
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    homeContentPointerDownEvent (event: PointerEvent): void
    {
        homeContentPointerDownService(event);
    }

    /**
     * @description ホームコンテンツのポインターアップ時の処理
     *              Handle when home content is pointer up
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    homeContentPointerUpEvent (event: PointerEvent): void
    {
        homeContentPointerUpService(event);
    }

    /**
     * @description ホームテキストの変更時の処理
     *              Handle when home text is changed
     *
     * @param  {Event} event
     * @return {void}
     * @method
     * @public
     */
    homeTextChangeEvent (event: Event): void
    {
        homeTextChangeService(event);
    }
}