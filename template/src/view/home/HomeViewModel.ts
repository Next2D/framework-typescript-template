import { View, ViewModel } from "@next2d/framework";
import { HomeButtonTemplate } from "@/model/ui/component/template/home/HomeButtonTemplate";
import { HomeTextTemplate } from "@/model/ui/component/template/home/HomeTextTemplate";
import type { HomeContent } from "@/model/application/content/HomeContent";
import type { TextField } from "@next2d/display";

/**
 * @class
 * @extends {ViewModel}
 */
export class HomeViewModel extends ViewModel
{
    /**
     * @param  {View} view
     * @return {void}
     * @method
     * @public
     */
    unbind (view: View): void
    {
        console.log(view);
    }

    /**
     * @param  {View} view
     * @return {Promise}
     * @method
     * @public
     */
    bind (view: View): Promise<View>
    {
        return this
            .factory(view)
            .then((view): Promise<View> =>
            {
                /**
                 * アニメーションをNoCodeToolのJSONから生成
                 * Generate animation from NoCodeTool's JSON
                 */
                const homeContent: HomeContent = new HomeButtonTemplate().factory();
                view.addChild(homeContent);

                /**
                 * Hello, Worldのテキストを生成
                 * Generate Hello, World text
                 */
                const homeTextField: TextField = new HomeTextTemplate().factory(homeContent);
                view.addChild(homeTextField);

                return Promise.resolve(view);
            });
    }
}