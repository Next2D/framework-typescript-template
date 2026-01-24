import type { HomeViewModel } from "@/view/home/HomeViewModel";
import { Sprite } from "@next2d/display";
import { HomeBtnMolecule } from "@/ui/component/molecule/HomeBtnMolecule";
import { config } from "@/config/Config";
import { PointerEvent, Event } from "@next2d/events";
import { TextAtom } from "../../atom/TextAtom";

/**
 * @description ホーム画面のページ
 *              Home Screen Page
 *
 * @class
 * @extends {Sprite}
 * @public
 */
export class HomePage extends Sprite {

    /**
     * @description 初期起動関数
     *              Initializer function
     *
     * @param  {HomeViewModel} vm
     * @return {void}
     * @method
     * @public
     */
    initialize (vm: HomeViewModel): void {

        /**
         * ホームコンテンツの座標をセット
         * Set the coordinates of the home content
         */
        const homeContent = new HomeBtnMolecule();
        homeContent.x = config.stage.width  / 2 - 5;
        homeContent.y = config.stage.height / 2;

        /**
         * ホームコンテンツのイベントをViewModelに送信
         * Send home content events to ViewModel
         */
        homeContent.addEventListener(PointerEvent.POINTER_DOWN, (event: PointerEvent) => {
            vm.homeContentPointerDownEvent(event);
        });
        homeContent.addEventListener(PointerEvent.POINTER_UP, (event: PointerEvent) => {
            vm.homeContentPointerUpEvent(event);
        });

        /**
         * ホームコンテンツを追加
         * Add home content
         */
        this.addChild(homeContent);

        /**
         * ホームテキストをViewModelから取得
         * Get home text from ViewModel
         */
        const textField = new TextAtom(vm.getHomeText(), {
            "autoSize": "center",
            "type": "input"
        });

        /**
         * ホームテキストの座標をセット
         * Set the coordinates of the home text
         */
        textField.x = (config.stage.width - textField.width) / 2;
        textField.y = homeContent.y + homeContent.height / 2 + textField.height;

        /**
         * ホームテキストのイベントをViewModelに送信
         * Send home text events to ViewModel
         */
        textField.addEventListener(Event.CHANGE, (event: Event) => {
            vm.homeTextChangeEvent(event);
        });

        /**
         * ホームテキストを追加
         * Add home text
         */
        this.addChild(textField);
    }
}