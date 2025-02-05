import { app } from "@next2d/framework";

/**
 * @class
 */
export const execute = async (): Promise<void> =>
{
    await app.gotoView("home");
};
