// @ts-ignore
import { config } from "@/config/Config";
import { ButtonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { execute as topButtonMouseUpEvent } from "@/model/domain/event/top/TopButtonMouseUpEvent";
import { execute as textComponent } from "@/model/ui/component/atom/TextComponent";
import { response } from "@next2d/framework";
import { MouseEvent } from "@next2d/events";
import type { TopContent } from "@/model/application/content/TopContent";
import type { TextField, MovieClip } from "@next2d/display";
import type { ParentImpl } from "@next2d/interface";

/**
 * @description Topページのボタンを生成
 *              Generate Top page button
 *
 * @return {MovieClip}
 * @method
 * @public
 */
export const execute = (top_content: TopContent): ParentImpl<MovieClip> =>
{
    const button: ParentImpl<MovieClip> = ButtonComponent.factory();
    button.name    = "button";
    button.visible = false;

    /**
     * @see domain/event/top/TopButtonMouseUpEvent.js
     * ドメイン層から専用のイベントを起動
     * Launch dedicated events from the domain layer
     */
    button.addEventListener(MouseEvent.MOUSE_UP, topButtonMouseUpEvent);

    const textField: TextField = textComponent(
        response.get("TopText").word,
        {
            "autoSize": "center"
        }
    );

    textField.x = config.stage.width / 2 - textField.width / 2;
    textField.y = top_content.y + top_content.height / 2 + textField.height;

    button.addChild(textField);

    return button;
};