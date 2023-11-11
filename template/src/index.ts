"use strict";

import { app } from "@next2d/framework";
// @ts-ignore
import { config } from "@/config/Config";
// @ts-ignore
import { packages } from "@/Packages";

/**
 * @return {void}
 * @method
 * @private
 */
const boot = (event: Event | null = null): void =>
{
    if (event && event.target) {
        event.target.removeEventListener("DOMContentLoaded", boot);
    }

    app
        .initialize(config, packages)
        .run()
        .then((): void =>
        {
            app.gotoView();
        });
};

if (document.readyState === "loading") {

    window.addEventListener("DOMContentLoaded", boot);

} else {

    boot();

}