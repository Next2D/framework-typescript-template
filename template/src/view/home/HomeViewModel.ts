import { View, ViewModel } from "@next2d/framework";
import { execute as homeButtonTemplate } from "@/model/ui/component/template/home/HomeButtonTemplate";
import { execute as homeTextTemplate } from "@/model/ui/component/template/home/HomeTextTemplate";

/**
 * @class
 * @extends {ViewModel}
 */
export class HomeViewModel extends ViewModel
{
    /**
     * @param  {View} view
     * @return {Promise<View>}
     * @method
     * @public
     */
    async unbind (view: View): Promise<View>
    {
        return super.unbind(view);
    }

    /**
     * @param  {View} view
     * @return {Promise<void>}
     * @method
     * @public
     */
    async bind (view: View): Promise<void>
    {
        /**
         * アニメーションをAnimation ToolのJSONから生成
         * Generate animation from Animation Tool's JSON
         */
        const homeContent = homeButtonTemplate();
        view.addChild(homeContent);

        /**
         * Hello, Worldのテキストを生成
         * Generate Hello, World text
         */
        view.addChild(homeTextTemplate(homeContent));
    }
}