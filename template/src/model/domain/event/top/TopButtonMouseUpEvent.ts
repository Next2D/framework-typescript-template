import { app } from "@/index";

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
    execute ()
    {
        app.gotoView("home");
    }
}