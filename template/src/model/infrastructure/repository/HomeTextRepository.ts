import type { IHomeTextResponse } from "@/interface/IHomeTextResponse";
import { config } from "@/config/Config";

/**
 * @class
 */
export class HomeTextRepository {
    /**
     * @description Home画面のテキストデータを取得
     *              Get text data for Home screen
     *
     * @return {Promise<IHomeTextResponse>}
     * @static
     * @throws {Error} Failed to fetch home text
     */
    static async get (): Promise<IHomeTextResponse>
    {
        try {
            const response = await fetch(`${config.api.endPoint}api/home.json`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as IHomeTextResponse;
        } catch (error) {
            console.error("Failed to fetch home text:", error);
            throw error;
        }
    }
}