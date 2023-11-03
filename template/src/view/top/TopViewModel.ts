import { View, ViewModel } from "@next2d/framework";
import { TopContentTemplate } from "@/model/ui/component/template/top/TopContentTemplate";
import { TopButtonTemplate } from "@/model/ui/component/template/top/TopButtonTemplate";
import type { TopContent } from "@/model/application/content/TopContent";
import type { MovieClip } from "@next2d/display";
import type { ParentImpl } from "@next2d/interface";

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
                 * ロゴアニメーションをNoCodeToolのJSONから生成
                 * Logo animation generated from NoCodeTool's JSON
                 */
                const topContent: TopContent = new TopContentTemplate().factory();
                view.addChild(topContent);

                /**
                 * ボタンエリアを生成
                 * Generate button area
                 */
                const button: ParentImpl<MovieClip> = new TopButtonTemplate().factory(topContent);
                view.addChild(button);

                return Promise.resolve(view);
            });
    }
}