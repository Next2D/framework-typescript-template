import type { TextField } from "@next2d/text";
import type { HomeContent } from "@/model/application/content/HomeContent";
import { config } from "@/config/Config";
import { execute as textComponent } from "@/model/ui/component/atom/TextComponent";
import { app } from "@next2d/framework";
import { Event } from "@next2d/events";

/**
 * @description Home画面のTextFieldを作成
 *              Create a TextField for the Home screen
 *
 * @return {TextField}
 * @method
 * @public
 */
export const execute = (home_content: HomeContent): TextField =>
{
    const response = app.getResponse();

    // Hello, World.
    const text = response.has("HomeText") ? response.get("HomeText").word : "";
    const textField = textComponent(text, {
        "autoSize": "center",
        "type": "input"
    });

    textField.addEventListener(Event.CHANGE, () =>
    {
        textField.x = config.stage.width / 2 - textField.width / 2;
    });

    textField.x = config.stage.width / 2 - textField.width / 2;
    textField.y = home_content.y + home_content.height / 2 + textField.height;

    return textField;
};