import { View, ViewModel } from "@next2d/framework";
import { TopContentTemplate } from "@/model/ui/component/template/top/TopContentTemplate";
import { TopButtonTemplate } from "@/model/ui/component/template/top/TopButtonTemplate";

/**
 * @class
 * @extends {ViewModel}
 */
export class TopViewModel extends ViewModel
{
    /**
     * @param  {View} view
     * @return {void}
     * @method
     * @public
     */
    unbind (view: View)
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
            .then((view) =>
            {
                /**
                 * ロゴアニメーションをNoCodeToolのJSONから生成
                 * Logo animation generated from NoCodeTool's JSON
                 */
                const topContent = new TopContentTemplate().factory();
                view.addChild(topContent);

                /**
                 * ボタンエリアを生成
                 * Generate button area
                 */
                const button = new TopButtonTemplate().factory(topContent);
                view.addChild(button);

                return Promise.resolve(view);
            });
    }
}