import { Application } from "@next2d/framework";
import { ConfigImpl } from "@next2d/framework/dist/interface/ConfigImpl";

/**
 * @class
 * @extends {Application}
 */
export class App extends Application
{
    /**
     * @param {object} config
     * @param {array}  packages
     * @public
     */
    constructor (config: ConfigImpl, packages: any[])
    {
        super(config, packages);
    }
}