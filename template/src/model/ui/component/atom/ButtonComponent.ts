import { MovieClip } from "@next2d/display";

/**
 * @description 指定したコンテンツをボタンモードに設定します。
 *              Sets the specified content to button mode.
 *
 * @param  {D} content
 * @return {D}
 * @method
 * @public
 */
export const execute = <D extends MovieClip> (content: D | null = null): D =>
{
    const button = content || new MovieClip();
    button.buttonMode = true;

    return button as D;
};