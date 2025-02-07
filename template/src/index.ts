"use strict";

import type { IConfig } from "@/interface/IConfig";
import { app } from "@next2d/framework";
import { config } from "@/config/Config";
import { packages } from "@/Packages";

/**
 * @return {Promise<void>}
 * @method
 * @private
 */
const boot = async (event: Event | null = null): Promise<void> =>
{
    if (event && event.target) {
        event.target.removeEventListener("DOMContentLoaded", boot);
    }

    await app.initialize(config as IConfig, packages).run();
    await app.gotoView();
};

if (document.readyState === "loading") {

    window.addEventListener("DOMContentLoaded", boot);

} else {

    boot();

}