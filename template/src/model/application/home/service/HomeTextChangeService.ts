import type { TextAtom } from "@/ui/component/atom/TextAtom";
import type { Event } from "@next2d/events";
import { config } from "@/config/Config";

/**
 * @description Home画面のTextFieldのChangeイベントを処理
 *              Handle Change events for TextField on Home screen
 *
 * @param {Event} event
 * @return {void}
 * @method
 * @public
 */
export const execute = (event: Event): void =>
{
    const textAtom = event.currentTarget as TextAtom;
    textAtom.x = (config.stage.width - textAtom.width) / 2;
};