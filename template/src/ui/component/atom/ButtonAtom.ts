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

    /**
     * @description ボタンを有効化する
     *              Enable button
     *
     * @return {void}
     * @method
     * @public
     */
    enable(): void {
        this.mouseEnabled  = true;
        this.mouseChildren = true;
    }

    /**
     * @description ボタンを無効化する
     *              Disable button
     *
     * @return {void}
     * @method
     * @public
     */
    disable(): void {
        this.mouseEnabled  = false;
        this.mouseChildren = false;
    }
}