import type { HomeViewModel } from "./HomeViewModel";
import { View } from "@next2d/framework";

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
        return void 0;
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