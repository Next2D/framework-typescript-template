import type { TopContent } from "@/model/application/content/TopContent";
import type { MovieClip } from "@next2d/display";
import { config } from "@/config/Config";
import { execute as buttonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { execute as topButtonPointerUpEvent } from "@/model/domain/event/top/TopButtonPointerUpEvent";
import { execute as textComponent } from "@/model/ui/component/atom/TextComponent";
import { app } from "@next2d/framework";
import { PointerEvent } from "@next2d/events";

/**
 * @description Topページのボタンを生成
 *              Generate Top page button
 *
 * @return {MovieClip}
 * @method
 * @public
 */
export const execute = <D extends MovieClip> (top_content: TopContent): D =>
{
    const response = app.getResponse();

    const text = response.has("TopText") ? response.get("TopText").word : "";
    const textField = textComponent(text, {
        "autoSize": "center"
    });

    textField.x = config.stage.width / 2 - textField.width / 2;
    textField.y = top_content.y + top_content.height / 2 + textField.height;

    const button = buttonComponent();
    button.addChild(textField);

    /**
     * ドメイン層から専用のイベントを起動
     * Launch dedicated events from the domain layer
     */
    button.addEventListener(PointerEvent.POINTER_UP, topButtonPointerUpEvent);

    return button as D;
};