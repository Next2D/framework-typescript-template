import { context } from "@next2d/framework";
import { Event } from "@next2d/events";
import type { EventDispatcherImpl } from "@next2d/interface";
import type { MovieClip } from "@next2d/display";
import type { View } from "@next2d/framework";

/**
 * @class
 */
export class TopContentEnterFrameEvent
{
    /**
     * @param  {Event} event
     * @return {void}
     * @method
     * @public
     */
    execute (event: Event)
    {
        const content: EventDispatcherImpl<MovieClip> = event.currentTarget;

        /**
         * 最終フレームになったらイベントを終了してボタンを表示
         */
        if (content.currentFrame === content.totalFrames) {

            content.removeEventListener(Event.ENTER_FRAME, event.listener);

            const view: View | null = context.view;
            if (!view) {
                return ;
            }
            // @ts-ignore
            view.button.visible = true;
        }
    }
}