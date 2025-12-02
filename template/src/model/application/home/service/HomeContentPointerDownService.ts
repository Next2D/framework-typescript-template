import type { HomeContent } from "@/ui/content/HomeContent";
import { PointerEvent } from "@next2d/events";

/**
 * @description Home画面のコンテンツのPointerDownイベントを処理
 *              Handle PointerDown events for Home screen content
 *
 * @param  {PointerEvent} event
 * @return {void}
 * @method
 * @public
 */
export const execute = (event: PointerEvent): void =>
{
    const homeContent = event.currentTarget as HomeContent;
    homeContent.startDrag();
};