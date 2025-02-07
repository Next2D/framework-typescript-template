import type { Event } from "@next2d/events";
import type { Sprite } from "@next2d/display";

/**
 * @description Home画面のキャラクターの移動開始処理
 *              Processes the start of character movement on the Home screen.
 *
 * @return {void}
 * @method
 * @public
 */
export const execute = (event: Event): void =>
{
    const sprite = event.currentTarget as Sprite;
    sprite.startDrag();
};