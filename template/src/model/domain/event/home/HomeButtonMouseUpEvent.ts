import type { Event } from "@next2d/events";
import type { Sprite } from "@next2d/display";

/**
 * @description Home画面のキャラクターの移動処理を終了
 *              Terminates the process of moving the character on the Home screen.
 *
 * @param {Event} event
 * @method
 * @public
 */
export const execute = (event: Event): void =>
{
    const sprite = event.currentTarget as Sprite;
    sprite.stopDrag();
};