import { View, ViewModel } from "@next2d/framework";
import { execute as topContentTemplate } from "@/model/ui/component/template/top/TopContentTemplate";
import { execute as topButtonTemplate } from "@/model/ui/component/template/top/TopButtonTemplate";
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
                 * ロゴアニメーションをAnimation ToolのJSONから生成
                 * Logo animation generated from Animation Tool JSON
                 */
                const topContent: TopContent = topContentTemplate();
                view.addChild(topContentTemplate());

                /**
                 * ボタンエリアを生成
                 * Generate button area
                 */
                const button: ParentImpl<MovieClip> = topButtonTemplate(topContent);
                view.addChild(button);

                return Promise.resolve(view);
            });
    }
}