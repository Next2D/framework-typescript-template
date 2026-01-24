import type { TopViewModel } from "@/view/top/TopViewModel";
import { config } from "@/config/Config";
import { TopContent } from "@/ui/content/TopContent";
import { Sprite } from "@next2d/display";
import { PointerEvent } from "@next2d/events";
import { TopBtnMolecule } from "../../molecule/TopBtnMolecule";

/**
 * @description トップ画面のページ
 *              Top Screen Page
 *
 * @class
 * @extends {Sprite}
 * @public
 */
export class TopPage extends Sprite {

    private _topBtnMolecule!: TopBtnMolecule;

    /**
     * @description 初期起動関数
     *              Initializer function
     *
     * @param  {TopViewModel} vm
     * @return {void}
     * @method
     * @public
     */
    initialize (vm: TopViewModel): void {

        /**
         * ロゴアニメーションをAnimation ToolのJSONから生成
         * Logo animation generated from Animation Tool's JSON
         */
        const topContent = new TopContent();

        /**
         * ロゴアニメーションを画面中央に配置
         * Place logo animation in the center of the screen
         */
        topContent.x = config.stage.width  / 2;
        topContent.y = config.stage.height / 2;
        this.addChild(topContent);

        /**
         * Topボタンを生成して、座標をセット
         * Create Top button and set coordinates
         */
        const topBtnMolecule = new TopBtnMolecule(vm.getTopText());
        topBtnMolecule.alpha = 0;
        topBtnMolecule.x = config.stage.width  / 2;
        topBtnMolecule.y = config.stage.height / 2 + topContent.height / 2 + topBtnMolecule.height;

        /**
         * アニメーションが完了するまでボタンを無効化
         * Disable button until animation is complete
         */
        topBtnMolecule.disable();

        /**
         * ボタンのクリックイベントをViewModelに送信
         * Send button click event to ViewModel
         */
        topBtnMolecule.addEventListener(PointerEvent.POINTER_UP, async (): Promise<void> => {
            await vm.onClickStartButton();
        });

        /**
         * Topボタンを画面に追加
         * Add Top button to the screen
         */
        this.addChild(topBtnMolecule);
        this._topBtnMolecule = topBtnMolecule;
    }

    /**
     * @description ページ表示時の処理
     *              Processing when the page is displayed
     *
     * @return {Promise<void>}
     * @method
     * @public
     */
    async onEnter (): Promise<void> {
        this._topBtnMolecule?.show((): void => {
            this._topBtnMolecule.enable();
        });
    }
}