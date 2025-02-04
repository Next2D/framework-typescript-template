import { MovieClip } from "@next2d/display";

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
    static factory <D extends MovieClip> (content: D | null = null): D
    {
        const button = content || new MovieClip();
        button.buttonMode = true;

        return button as D;
    }
}
