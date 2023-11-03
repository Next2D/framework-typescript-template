import { app } from "@next2d/framework";

/**
 * @class
 */
export class TopButtonMouseUpEvent
{
    /**
     * @return {void}
     * @method
     * @public
     */
    execute (): void
    {
        app.gotoView("home");
    }
}