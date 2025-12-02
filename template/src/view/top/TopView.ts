import type { TopViewModel } from "./TopViewModel";
import { View } from "@next2d/framework";
import { TopBtnMolecule } from "@/ui/component/molecule/TopBtnMolecule";
import { config } from "@/config/Config";
import { PointerEvent } from "@next2d/events";
import { TopContent } from "@/ui/content/TopContent";

/**
 * @class
 * @extends {View}
 */
export class TopView extends View
{
    /**
     * @param {TopViewModel} vm
     * @constructor
     * @public
     */
    constructor (
        private readonly vm: TopViewModel
    ) {
        super();
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        /**
         * ロゴアニメーションをAnimation ToolのJSONから生成
         * Logo animation generated from Animation Tool's JSON
         */
        const topContent = new TopContent();

        topContent.x = config.stage.width  / 2;
        topContent.y = config.stage.height / 2;

        this.addChild(topContent);

        /**
         * Topボタンを生成して、座標をセット
         * Create Top button and set coordinates
         */
        const topBtn = new TopBtnMolecule();
        topBtn.name = "topBtn";
        topBtn.x = config.stage.width  / 2;
        topBtn.y = config.stage.height / 2 + topContent.height / 2 + topBtn.height;

        /**
         * アニメーションが完了するまでボタンを無効化
         * Disable button until animation is complete
         */
        topBtn.mouseChildren = false;
        topBtn.mouseEnabled  = false;

        /**
         * ボタンのクリックイベントをViewModelに送信
         * Send button click event to ViewModel
         */
        topBtn.addEventListener(PointerEvent.POINTER_UP, async (): Promise<void> =>
        {
            await this.vm.onClickStartButton();
        });

        /**
         * Topボタンを画面に追加
         * Add Top button to the screen
         */
        this.addChild(topBtn);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onEnter (): Promise<void>
    {
        const topBtn = this.getChildByName<TopBtnMolecule>("topBtn");
        if (!topBtn) {
            return;
        }
        topBtn.playEntrance(() =>
        {
            // アニメーション完了後にボタンを有効化
            // Enable button after animation is complete
            topBtn.mouseChildren = true;
            topBtn.mouseEnabled  = true;
        });
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onExit (): Promise<void>
    {
        return void 0;
    }
}