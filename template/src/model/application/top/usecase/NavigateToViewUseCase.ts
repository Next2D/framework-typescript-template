import { app } from "@next2d/framework";

/**
 * @description 画面遷移のユースケース
 *              Use case for navigating to a view
 *
 * @class
 */
export class NavigateToViewUseCase
{
    /**
     * @description 指定された画面に遷移する
     *              Navigate to the specified view
     *
     * @param  {string} viewName
     * @return {Promise<void>}
     * @method
     * @public
     */
    async execute (viewName: string): Promise<void>
    {
        await app.gotoView(viewName);
    }
}
