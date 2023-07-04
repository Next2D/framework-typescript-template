import type { Event } from "@next2d/events";
import type { EventDispatcherImpl } from "@next2d/interface";
import type { Sprite } from "@next2d/display";

/**
 * @class
 */
export class HomeButtonMouseUpEvent
{
    /**
     * @param  {Event} event
     * @return {void}
     * @method
     * @public
     */
    execute (event: Event): void
    {
        const sprite: EventDispatcherImpl<Sprite> = event.currentTarget;
        sprite.stopDrag();
    }
}