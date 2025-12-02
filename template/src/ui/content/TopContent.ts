import { MovieClipContent } from "@next2d/framework";

/**
 * @see file/sample.n2d
 * @class
 * @extends {MovieClipContent}
 */
export class TopContent extends MovieClipContent
{
    /**
     * @return {string}
     * @readonly
     * @public
     */
    get namespace (): string
    {
        return "TopContent";
    }
}