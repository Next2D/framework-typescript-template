import type { HomeViewModel } from "./HomeViewModel";
import { View } from "@next2d/framework";
import { config } from "@/config/Config";
import { HomeBtnMolecule } from "@/ui/component/molecule/HomeBtnMolecule";
import { TextAtom } from "@/ui/component/atom/TextAtom";
import { PointerEvent, Event } from "@next2d/events";

/**
 * @class
 * @extends {View}
 */
export class HomeView extends View
{
    /**
     * @param {HomeViewModel} vm
     * @constructor
     * @public
     */
    constructor (
        private readonly vm: HomeViewModel
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
        homeContent.addEventListener(PointerEvent.POINTER_DOWN,
            this.vm.homeContentPointerDownEvent.bind(this.vm)
        );
        homeContent.addEventListener(PointerEvent.POINTER_UP,
            this.vm.homeContentPointerUpEvent.bind(this.vm)
        );

        /**
         * ホームコンテンツを追加
         * Add home content
         */
        this.addChild(homeContent);

        /**
         * ホームテキストをViewModelから取得
         * Get home text from ViewModel
         */
        const text = this.vm.getHomeText();
        const textField = new TextAtom(text, {
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
        textField.addEventListener(Event.CHANGE,
            this.vm.homeTextChangeEvent.bind(this.vm)
        );

        /**
         * ホームテキストを追加
         * Add home text
         */
        this.addChild(textField);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onEnter (): Promise<void>
    {
        return void 0;
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