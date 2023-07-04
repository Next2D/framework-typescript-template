import { MovieClip } from "@next2d/display";
import type { ParentImpl } from "@next2d/interface";

/**
 * @class
 */
export class ButtonComponent
{
    /**
     * @param {Sprite} [content=null]
     * @method
     * @static
     */
    static factory (content: ParentImpl<any> | null = null): ParentImpl<any>
    {
        const button = content || new MovieClip();
        button.buttonMode = true;

        return button;
    }
}
