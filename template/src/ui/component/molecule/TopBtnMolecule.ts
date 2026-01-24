import { TopBtnShowAnimation } from "@/ui/animation/top/TopBtnShowAnimation";
import { ButtonAtom } from "../atom/ButtonAtom";
import { TextAtom } from "../atom/TextAtom";

/**
 * @description Top画面のボタン分子
 *              Top Screen Button Molecule
 *
 * @class
 * @extends {ButtonAtom}
 * @public
 */
export class TopBtnMolecule extends ButtonAtom {

    /**
     * @param {string} text - ボタンに表示するテキスト / Text to display on the button
     * @constructor
     * @public
     */
    constructor (text: string)
    {
        super();

        const textField = new TextAtom(text, {
            "autoSize": "center"
        });

        textField.x = -textField.width  / 2;
        textField.y = -textField.height / 2;

        this.addChild(textField);
    }

    /**
     * @description ボタンのアニメーションを再生
     *              Play button entrance animation
     *
     * @param  {() => void} callback
     * @return {void}
     * @method
     * @public
     */
    show (callback: () => void): void
    {
        new TopBtnShowAnimation(this, callback).start();
    }
}