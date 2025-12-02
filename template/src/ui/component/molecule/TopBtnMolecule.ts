import { TopBtnEntranceAnimation } from "@/ui/animation/top/TopBtnEntranceAnimation";
import { ButtonAtom } from "../atom/ButtonAtom";
import { TextAtom } from "../atom/TextAtom";
import { app } from "@next2d/framework";

/**
 * @description Top画面のボタン分子
 *              Top Screen Button Molecule
 *
 * @class
 * @extends {ButtonAtom}
 * @public
 */
export class TopBtnMolecule extends ButtonAtom
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();

        const response = app.getResponse();

        const text = response.has("TopText") ? response.get("TopText").word : "";
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
     * @return {void}
     * @method
     * @public
     */
    playEntrance (callback: () => void): void
    {
        new TopBtnEntranceAnimation(this, callback).start();
    }
}