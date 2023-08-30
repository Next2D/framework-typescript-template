// @ts-ignore
import { config } from "@/config/Config";
import { TextComponent } from "@/model/ui/component/atom/TextComponent";
import { response } from "@next2d/framework";
import type { TextField } from "@next2d/display";
import type { HomeContent } from "@/model/application/content/HomeContent";

/**
 * @class
 */
export class HomeTextTemplate
{
    /**
     * @return {TextField}
     * @method
     * @public
     */
    factory (home_content: HomeContent): TextField
    {
        // Hello, World.
        const textField: TextField = TextComponent.factory(
            response.get("HomeText").word,
            {
                "autoSize": "center",
                "type": "input"
            }
        );

        textField.x = config.stage.width / 2 - textField.width / 2;
        textField.y = home_content.y + home_content.height / 2 + textField.height;

        return textField;
    }
}