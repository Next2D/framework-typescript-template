// @ts-ignore
import { config } from "@/config/Config";
import { ButtonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { TopButtonMouseUpEvent } from "@/model/domain/event/top/TopButtonMouseUpEvent";
import { TextComponent } from "@/model/ui/component/atom/TextComponent";
import { response } from "@next2d/framework";
import { MouseEvent } from "@next2d/events";
import type { TopContent } from "@/model/application/content/TopContent";
import type { TextField, MovieClip } from "@next2d/display";
import type { ParentImpl } from "@next2d/interface";

/**
 * @class
 */
export class TopButtonTemplate
{
    private _$buttonComponentMouseUpEvent: TopButtonMouseUpEvent;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {TopButtonMouseUpEvent}
         * @private
         */
        this._$buttonComponentMouseUpEvent = new TopButtonMouseUpEvent();
    }

    /**
     * @param  {TopContent} top_content
     * @return {MovieClip}
     * @method
     * @public
     */
    factory (top_content: TopContent): ParentImpl<MovieClip>
    {
        const button: ParentImpl<MovieClip> = ButtonComponent.factory();
        button.name    = "button";
        button.visible = false;

        button.addEventListener(MouseEvent.MOUSE_UP, (): void =>
        {
            /**
             * @see domain/event/top/TopButtonMouseUpEvent.js
             * ドメイン層から専用のイベントを起動
             * Launch dedicated events from the domain layer
             */
            this._$buttonComponentMouseUpEvent.execute();
        });

        const textField: TextField = TextComponent.factory(
            response.get("TopText").word,
            {
                "autoSize": "center"
            }
        );

        textField.x = config.stage.width / 2 - textField.width / 2;
        textField.y = top_content.y + top_content.height / 2 + textField.height;

        button.addChild(textField);

        return button;
    }
}