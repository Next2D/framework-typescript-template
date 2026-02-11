import type { HomeViewModel } from "./HomeViewModel";
import { View } from "@next2d/framework";
import { HomePage } from "@/ui/component/page/home/HomePage";

/**
 * @class
 * @extends {View}
 */
export class HomeView extends View<HomeViewModel> {

    /**
     * @private
     * @readonly
     */
    private readonly _homePage: HomePage;

    /**
     * @param {HomeViewModel} vm
     * @constructor
     * @public
     */
    constructor (vm: HomeViewModel)
    {
        super(vm);

        this._homePage = new HomePage();
        this.addChild(this._homePage);
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        this._homePage.initialize(this.vm);
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