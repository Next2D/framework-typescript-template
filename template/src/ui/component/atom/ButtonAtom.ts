import { Sprite } from "@next2d/display";

/**
 * @description ボタンアトム
 *              Button Atom
 *
 * @class
 * @extends {Sprite}
 * @public
 */
export class ButtonAtom extends Sprite {
    /**
     * @description ボタンアトムを生成する
     *              Create a button atom
     *
     * @constructor
     * @public
     */
    constructor() {
        super();

        // ボタンモードを有効化する
        this.buttonMode = true;
    }
}