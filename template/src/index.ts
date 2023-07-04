"use strict";

import "@next2d/framework";

import { App } from "@/App";
// @ts-ignore
import { config } from "@/config/Config";
// @ts-ignore
import { packages } from "@/Packages";

const app: App = new App(config, packages);
if (document.readyState === "loading") {

    const initialize = (event: Event) =>
    {
        if (!event.target) {
            return ;
        }

        event.target.removeEventListener("DOMContentLoaded", initialize);
        app
            .run()
            .then(() =>
            {
                app.gotoView();
            });
    };

    window.addEventListener("DOMContentLoaded", initialize);

} else {

    app
        .run()
        .then(() =>
        {
            app.gotoView();
        });

}

export { app };
