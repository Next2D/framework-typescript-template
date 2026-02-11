import type { TopViewModel } from "./TopViewModel";
import { View } from "@next2d/framework";
import { TopPage } from "@/ui/component/page/top/TopPage";

/**
 * @class
 * @extends {View}
 */
export class TopView extends View<TopViewModel> {

    /**
     * @private
     * @readonly
     */
    private readonly _topPage: TopPage;

    /**
     * @param {TopViewModel} vm
     * @constructor
     * @public
     */
    constructor (vm: TopViewModel)
    {
        super(vm);

        this._topPage = new TopPage();
        this.addChild(this._topPage);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        this._topPage.initialize(this.vm);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async onEnter (): Promise<void>
    {
        await this._topPage.onEnter();
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