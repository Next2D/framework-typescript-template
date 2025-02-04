// @ts-ignore
import { config } from "@/config/Config";

/**
 * @class
 */
export class HomeTextRepository
{
    /**
     * @return {Promise}
     * @static
     */
    static async get (): Promise<any>
    {
        const response = await fetch(`${config.api.endPoint}api/home.json`);
        return response.json();
    }
}