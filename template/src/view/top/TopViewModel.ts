import { ViewModel, app } from "@next2d/framework";

/**
 * @class
 * @extends {ViewModel}
 */
export class TopViewModel extends ViewModel
{
    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        return void 0;
    }

    /**
     * @description スタートボタンがクリックされたときの処理
     *              Handle when the start button is clicked
     *
     * @return {Promise<void>}
     * @method
     * @public
     */
    async onClickStartButton (): Promise<void>
    {
        await app.gotoView("home");
    }
}