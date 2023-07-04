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
    static get (): Promise<any>
    {
        return fetch(`${config.api.endPoint}api/home.json`)
            .then((response: Response) =>
            {
                return response.json();
            })
            .catch((error) =>
            {
                console.error(error);
            });
    }
}