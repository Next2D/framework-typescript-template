import type { ViewName } from "@/interface/IViewName";
import { app } from "@next2d/framework";

/**
 * @description 画面遷移のユースケース
 *              Use case for navigating to a view
 *
 * @class
 */
export class NavigateToViewUseCase {
    /**
     * @description 指定された画面に遷移する
     *              Navigate to the specified view
     *
     * @param  {ViewName} viewName
     * @return {Promise<void>}
     * @method
     * @public
     */
    async execute (viewName: ViewName): Promise<void>
    {
        await app.gotoView(viewName);
    }
}
