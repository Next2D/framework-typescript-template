/**
 * @description 画面遷移オプションのインターフェース
 *              Interface for view navigation options
 *
 * @interface
 */
export interface IGotoView {
    /**
     * @description 画面遷移後に実行するコールバック関数名
     *              Callback function name(s) to execute after view transition
     *
     * @type {string | string[]}
     */
    callback: string | string[];
}