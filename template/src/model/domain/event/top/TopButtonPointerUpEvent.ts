import { app } from "@next2d/framework";

/**
 * @description トップページのボタンがポインターアップされた時の実行関数
 *              Execution function when the top button is mouse up
 *
 * @return {Promise<void>}
 * @method
 * @protected
 */
export const execute = async (): Promise<void> =>
{
    await app.gotoView("home");
};
