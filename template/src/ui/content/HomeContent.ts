import type { IDraggable } from "@/interface/IDraggable";
import { MovieClipContent } from "@next2d/framework";

/**
 * @see file/sample.n2d
 * @class
 * @extends {MovieClipContent}
 * @implements {IDraggable}
 */
export class HomeContent extends MovieClipContent implements IDraggable
{
    /**
     * @return {string}
     * @readonly
     * @public
     */
    get namespace (): string
    {
        return "HomeContent";
    }
}